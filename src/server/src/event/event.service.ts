import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateEventDto} from "./dto/create.event.dto";
import {CreateEventDetailDto} from "./dto/create.event.detail.dto";
import {CreateEventVenueDto} from "./dto/create.event.venue.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Event} from './model/event.model'
import EventDetail from "./model/eventDetail.model";
import {EventVenue} from "./model/eventVenue.model";
import {Sequelize} from "sequelize-typescript";
import sequelize, {Op} from "sequelize";
import {UpdateEventDto} from "./dto/update.event.dto";
import {UpdateEventDetailDto} from "./dto/update.event.detail.dto";
import {UpdateEventVenueDto} from "./dto/update.event.venue.dto";
import {FilesService} from "../files/files.service";
import {PaginationService} from "../pagination/pagination.service";
import {Config} from "../Config";
import {NotFoundException} from "../exceptions/not.found.exception";


@Injectable()
export class EventService {
    constructor(@InjectModel(Event) private eventRepository: typeof Event,
                @InjectModel(EventDetail) private eventDetailRepository: typeof EventDetail,
                @InjectModel(EventVenue) private eventVenueRepository: typeof EventVenue,
                private fileService: FilesService,
                private paginationService: PaginationService,
                private sequelize: Sequelize) {
    }

    async getEvents(offset: number, limit: number): Promise<Event[]> {
        return await this.eventRepository.findAll({
            offset: offset,
            limit: limit,
            include: [{model: EventVenue}, {model: EventDetail}]
        });
    }

    async getEventsForAdmin(page:number=1,itemsPerPage:number=5,sortField:string='id',sortType:string='asc',search:string=''){
        let count:number = await this.eventRepository.count({
            where:{
                title:{[Op.iLike]:`${search}%`}
            }
        });
        let pagination = await this.paginationService.createNavigation(page,itemsPerPage,count);
        let offset:number = (page-1) *itemsPerPage;
        let events= await this.eventRepository.findAll({
            where:{
                title:{[Op.iLike]:`${search}%`}
            },
            limit:itemsPerPage,
            offset:offset,
            order:[[sortField,sortType.toUpperCase()]],
            include:[
                {model:EventDetail},
                {model:EventVenue}
            ]
        })

        return {data:events,payload:pagination};

    }
    async getEventById(id:number):Promise<Event>{
        return this.eventRepository.findByPk(id,{
            include:[
                {model:EventDetail},
                {model:EventVenue}
            ]
        });
    }

    async getRandomEvent(limit: number): Promise<Event[]> {
        return await this.eventRepository.findAll({
            order: this.eventRepository.sequelize.literal('RANDOM()'),
            limit: limit,
            include: [{model: EventVenue}, {model: EventDetail}]
        })
    }

    async getEventBySlug(slug: string): Promise<Event> {
        return await this.eventRepository.findOne({
            where: {slug: slug},
            include: [{model: EventVenue}, {model: EventDetail}]
        })
    }

    async createEvent(eventDto: CreateEventDto, eventDetailDto: CreateEventDetailDto, eventVenueDto: CreateEventVenueDto): Promise<Event> {
        const transaction = await this.sequelize.transaction()
        try {
            const eventVenue: EventVenue = await this.eventVenueRepository.create(eventVenueDto, {transaction});
            const eventDetail: EventDetail = await this.eventDetailRepository.create({
                ...eventDetailDto,
                freePlaces: eventDetailDto.numberOfPlaces
            });
            const event: Event = await this.eventRepository.create({
                ...eventDto,
                eventDetailId: eventDetail.id,
                eventVenueId: eventVenue.id
            }, {transaction});
            await transaction.commit();
            return await this.eventRepository.findOne({
                where: {id: event.id},
                include: [{model: EventDetail}, {model: EventVenue}]
            })


        } catch (e) {
            await transaction.rollback();
            throw e;
        }

    }

    async updateEvent(eventId: number,
                      updateEventDto: UpdateEventDto,
                      updateEventDetailDto: UpdateEventDetailDto,
                      updateEventVenueDto: UpdateEventVenueDto) {
        const transaction = await this.sequelize.transaction();
        try {
            let event = await this.eventRepository.findByPk(eventId);
            await this.eventDetailRepository.update(updateEventDetailDto, {where: {id: event.eventDetailId}});
            await this.eventVenueRepository.update(updateEventVenueDto, {where: {id: event.eventVenueId}});
            await event.update(updateEventDto);
            await transaction.commit();
            return await this.eventRepository.findOne({
                where: {id: event.id},
                include: [{model: EventDetail}, {model: EventVenue}]
            });
        } catch (e) {
            await transaction.rollback();
            throw e;
        }

    }

    async updateThumbnail(id: number, thumbnail: Express.Multer.File) {
        try {
            let event = await this.eventRepository.findByPk(id);
            if (!event) {
                throw new NotFoundException("Event",id);
            }
            let thumbnailPath = await this.fileService.createFile(thumbnail, event.slug, Config.PATH.EVENT.THUMBNAIL_FOLDER);
            return await event.update({thumbnailPath: thumbnailPath});

        } catch (e) {
            console.log(e);
            throw new HttpException('File loading error!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updatePoster(id: number, poster: Express.Multer.File) {
        try {
            let event = await this.eventRepository.findByPk(id);
            if (!event) {
                throw new NotFoundException("Event",id);
            }
            let posterPath = await this.fileService.createFile(poster, event.slug, Config.PATH.EVENT.POSTER_FOLDER);
            return await event.update({posterPath: posterPath});

        } catch (e) {
            console.log(e);
            throw new HttpException('File loading error!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async removeEvent(eventId: number) {
        let transaction: sequelize.Transaction = await this.sequelize.transaction();
        try {
            let event: Event = await this.eventRepository.findByPk(eventId);
            if(!event)
                throw new NotFoundException("Course",eventId);
            await this.eventVenueRepository.destroy({where: {id: event.eventVenueId}});
            await this.eventDetailRepository.destroy({where: {id: event.eventDetailId}});
            await this.removeThumbnail(event.id);
            await this.removePoster(event.id);
            await event.destroy();
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async removeThumbnail(id: number) {
        let event = await this.eventRepository.findByPk(id);
        if (!event)
            throw new NotFoundException("Course",id);
        if (event.thumbnailPath === Config.PATH.EVENT.DEFAULT_THUMBNAIL)
            return;
        await this.fileService.removeFile(event.thumbnailPath);
        return event.update({thumbnailPath:Config.PATH.EVENT.DEFAULT_THUMBNAIL});
    }

    async removePoster(id: number) {
        let event = await this.eventRepository.findByPk(id);
        if (!event)
            throw new NotFoundException("Course",id);
        if (event.posterPath === Config.PATH.EVENT.DEFAULT_POSTER)
            return;
        await this.fileService.removeFile(event.posterPath);
        return event.update({posterPath:Config.PATH.EVENT.DEFAULT_POSTER});
    }

    async getNeighbourEventsSlugPair(currentEventSlug: string): Promise<string[]> {
        let eventsCollection = await this.eventRepository.findAll();
        let currentIndex = eventsCollection.findIndex((event) => event.slug === currentEventSlug);
        let eventPair = [];
        if (currentIndex == 0) {
            eventPair.push(eventsCollection[eventsCollection.length - 1].slug);
            eventPair.push(eventsCollection[++currentIndex].slug);
        } else if (currentIndex == eventsCollection.length - 1) {
            eventPair.push(eventsCollection[0].slug)
            eventPair.push(eventsCollection[--currentIndex].slug);
        } else {
            eventPair.push(eventsCollection[currentIndex - 1].slug);
            eventPair.push(eventsCollection[currentIndex + 1].slug);
        }

        return eventPair;
    }
}
