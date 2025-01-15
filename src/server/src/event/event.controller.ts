import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {EventService} from './event.service';
import {CreateEventDto} from "./dto/create.event.dto";
import {CreateEventDetailDto} from "./dto/create.event.detail.dto";
import {CreateEventVenueDto} from "./dto/create.event.venue.dto";
import {Event} from './model/event.model';
import {RoleGuard} from "../token/guard/role.guard";
import {Roles} from "../decorators/roles.auth.decorator";
import {UpdateEventDto} from "./dto/update.event.dto";
import {UpdateEventVenueDto} from "./dto/update.event.venue.dto";
import {UpdateEventDetailDto} from "./dto/update.event.detail.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {
    }

    @Get()
    async getEvents(@Query('limit') limit: number,
                    @Query('offset') offset: number): Promise<Event[]> {
        return await this.eventService.getEvents(offset, limit);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/admin')
    async getEventsAndPagination(@Query('page') page: number,
                                 @Query('items_per_page') itemPerPage: number,
                                 @Query('sort') sortField: string,
                                 @Query('order') sortType: string,
                                 @Query('search') query: string) {
        return await this.eventService.getEventsForAdmin(page, itemPerPage, sortField, sortType, query);
    }

    @Get('/neighbours/:slug')
    async getNeighbourSlugs(@Param('slug') slug: string): Promise<string[]> {
        return await this.eventService.getNeighbourEventsSlugPair(slug);
    }

    @Get('/random')
    async getRandomEvents(@Query('limit') limit: number): Promise<Event[]> {
        return await this.eventService.getRandomEvent(limit);
    }

    @Get('/:slug')
    async getEventBySlug(@Param('slug') slug: string): Promise<Event> {
        return await this.eventService.getEventBySlug(slug);
    }
    @Get('/by-id/:id')
    async getEventById(@Param('id') id:number):Promise<Event>{
        return await this.eventService.getEventById(id);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Post()
    async createEvent(@Body('event') eventDto: CreateEventDto,
                      @Body('event_detail') eventDetailDto: CreateEventDetailDto,
                      @Body('event_venue') eventVenueDto: CreateEventVenueDto): Promise<Event> {
        return await this.eventService.createEvent(eventDto, eventDetailDto, eventVenueDto);
    }


    @Put('/:id')
    async updateEvent(@Param('id') eventId: number,
                      @Body('event') updateEventDto: UpdateEventDto,
                      @Body('event_detail') updateEventDetailDto: UpdateEventDetailDto,
                      @Body('event_venue') updateEventVenueDto: UpdateEventVenueDto): Promise<Event> {
        return await this.eventService.updateEvent(eventId, updateEventDto, updateEventDetailDto, updateEventVenueDto);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('thumbnail'))
    @Put('/thumbnail/:id')
    async updateThumbnail(@Param('id') id: number,
                          @UploadedFile() thumbnail: Express.Multer.File) {
        return await this.eventService.updateThumbnail(id, thumbnail);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('poster'))
    @Put('/poster/:id')
    async updatePoster(@Param('id') id: number,
                       @UploadedFile() poster: Express.Multer.File) {
        return await this.eventService.updatePoster(id, poster);

    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async deleteEvent(@Param('id') eventId: number): Promise<void> {
        return await this.eventService.removeEvent(eventId);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/thumbnail/:id')
    async removeThumbnail(@Param('id') id: number) {
        return await this.eventService.removeThumbnail(id);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/poster/:id')
    async removePoster(@Param('id') id: number) {
        return await this.eventService.removePoster(id);
    }


}
