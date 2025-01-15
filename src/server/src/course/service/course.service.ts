import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Course} from "../model/course.model";
import {CourseSchedule} from "../model/course.schedule.model";
import {CreateCourseDto} from "../dto/create.course.dto";
import {CreateCourseScheduleDto} from "../dto/create.course.schedule.dto";
import {addAttribute, Sequelize} from "sequelize-typescript";
import {Lesson} from "../../lesson/lesson/lesson.model";
import {Review} from "../../review/model/review.model";
import {User} from "../../user/model/user.model";
import {UpdateCourseDto} from "../dto/update.course.dto";
import {UpdateCourseScheduleDto} from "../dto/update.course.schedule.dto";
import {CourseToLesson} from "../model/course.to.lesson.model";
import {Comment} from '../../comment/model/comment.model';
import {Op} from "sequelize";
import {PaginationService} from "../../pagination/pagination.service";
import {FilesService} from "../../files/files.service";
import {Config} from "../../Config";
import {DaysOfWeek} from "../course.days.of.week.enum";
import {NotFoundException} from "../../exceptions/not.found.exception";

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course) private courseRepository: typeof Course,
                @InjectModel(CourseSchedule) private courseScheduleRepository: typeof CourseSchedule,
                @InjectModel(CourseToLesson) private courseToLessonRepository: typeof CourseToLesson,
                private paginationService:PaginationService,
                private filesService:FilesService,
                private sequelize: Sequelize) {
    }

    async getCourses(offset: number, limit: number): Promise<Course[]> {
        return this.courseRepository.findAll({
            offset: offset,
            limit: limit,
            include: [{model: CourseSchedule}, {model: Lesson}, {model: Review}]
        })

    }
    async getCoursesAndPagination(page:number=1,
                                  itemsPerPage:number=5,
                                  sortField:string='id',
                                  sortType:string='asc',
                                  search:string=''){
        let count = await this.courseRepository.count({
            where:{
                title:{[Op.iLike]:`${search}%`}
            }
        });
        let pagination = await this.paginationService.createNavigation(page,itemsPerPage,count);
        let offset = (page-1) * itemsPerPage;
        let courses:Course[] = await this.courseRepository.findAll({
            where:{
                title:{[Op.iLike]:`${search}%`}
            },
            offset:offset,
            limit:itemsPerPage,
            order:[[sortField,sortType.toUpperCase()]],
            include:[{model:CourseSchedule}]

        });
        return {data:courses,payload:pagination};

    }

    async getRandomCourses(limit: number): Promise<Course[]> {
        return await this.courseRepository.findAll({
            order: this.courseRepository.sequelize.literal('RANDOM()'),
            limit: limit
        })
    }

    async getCourseBySlug(slug: string): Promise<Course> {
        return this.courseRepository.findOne({
            where: {slug: slug},
            include: [
                {model: CourseSchedule},
                {model: Lesson},
                {
                    model: Review,
                    limit: 4,
                    order: [['rating', 'DESC']],
                    include: [{model: User, attributes: ['login', 'avatarPath']}]
                },
                {
                    model: Comment,
                    include: [{model: User, attributes: ['login', 'avatarPath']}]
                }
            ]
        });
    }

    async getCourseById(id:number):Promise<Course>{
        return await this.courseRepository.findByPk(id,{
            include:[
                {model:CourseSchedule},
                {model:Lesson}
            ]
        })
    }

    async createCourse(courseDto: CreateCourseDto, courseScheduleDto: CreateCourseScheduleDto): Promise<Course> {
        const transaction = await this.sequelize.transaction();
        try {
            const daysValues:Array<DaysOfWeek> = Object.values(DaysOfWeek) as Array<DaysOfWeek>;
            let createDays:Array<DaysOfWeek> = courseScheduleDto.dayIds.map(id=>daysValues[id]);
            let courseSchedule = await this.courseScheduleRepository.create({...courseScheduleDto,days:createDays}, {transaction});
            let course = await this.courseRepository.create({
                ...courseDto,
                courseScheduleId: courseSchedule.id
            }, {transaction});
            await transaction.commit();
            return await this.courseRepository.findOne({where: {id: course.id}, include: [{model: CourseSchedule}]});
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async updateCourse(courseId: number, updateCourseDto: UpdateCourseDto, updateCourseScheduleDto: UpdateCourseScheduleDto): Promise<Course> {
        const transaction = await this.sequelize.transaction();
        try {
            let course = await this.courseRepository.findByPk(courseId);
            const daysValues:Array<DaysOfWeek> = Object.values(DaysOfWeek) as Array<DaysOfWeek>;
            let updateDays:Array<DaysOfWeek> = updateCourseScheduleDto.dayIds.map(id=>daysValues[id]);
            await course.update(updateCourseDto);
            await this.courseScheduleRepository.update({...updateCourseScheduleDto,days:updateDays}, {where: {id: course.courseScheduleId}});
            await transaction.commit();
            return await this.getCourseBySlug(course.slug);
        } catch (e) {
            await transaction.rollback();
            throw e;
        }

    }
    async updatePoster(id:number,poster:Express.Multer.File){
         let courseForUpdate = await this.courseRepository.findByPk(id);
         if(!courseForUpdate)
             throw new NotFoundException("Course",id);
         let updatedPath = await this.filesService.createFile(poster,courseForUpdate.slug,Config.PATH.COURSE.POSTER_FOLDER);
         return await courseForUpdate.update({posterPath:updatedPath});
    }
    async updateThumbnail(id:number, thumbnail:Express.Multer.File){
        let courseForUpdate = await this.courseRepository.findByPk(id);
        if(!courseForUpdate){
            throw new NotFoundException("Course",id);
        }
        let updatePath = await this.filesService.createFile(thumbnail,courseForUpdate.slug, Config.PATH.COURSE.THUMBNAIL_FOLDER);
        return await courseForUpdate.update({thumbnailPath:updatePath});
    }

    async removeCourse(courseId: number): Promise<void> {
        let transaction = await this.sequelize.transaction();
        try {
            let course = await this.courseRepository.findByPk(courseId);
            if(!course)
                throw new NotFoundException("Course",courseId);
            await this.courseToLessonRepository.destroy({where: {courseId: courseId}});
            await this.courseScheduleRepository.destroy({where: {id: course.courseScheduleId}});
            await this.removeThumbnail(course.id);
            await this.removePoster(course.id);
            await course.destroy();
            await transaction.commit();

        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async removeCourseToLessonByLessonId(lessonId: number) {
        return await this.courseToLessonRepository.destroy({where: {lessonId: lessonId}});
    }
    async removeThumbnail(id:number) {
        let course = await this.courseRepository.findByPk(id);
        if(!course)
            throw new NotFoundException("Course",id);
        if(course.thumbnailPath===Config.PATH.COURSE.DEFAULT_THUMBNAIL)
            return;
        await this.filesService.removeFile(course.thumbnailPath);
        return await course.update({thumbnailPath:Config.PATH.COURSE.DEFAULT_THUMBNAIL});
    }
    async removePoster(id:number){
        let course = await this.courseRepository.findByPk(id);
        if(!course)
            throw new NotFoundException("Course",id);
        if(course.thumbnailPath===Config.PATH.COURSE.DEFAULT_POSTER)
            return;
        await this.filesService.removeFile(course.posterPath);
        return await course.update({thumbnailPath:Config.PATH.COURSE.DEFAULT_POSTER});
    }
}
