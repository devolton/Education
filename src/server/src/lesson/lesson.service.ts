import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Lesson} from "./lesson/lesson.model";
import {CreateLessonDto} from "./dto/create.lesson.dto";
import {CourseService} from "../course/service/course.service";
import {Sequelize} from "sequelize-typescript";
import {UpdateLessonDto} from "./dto/update.lesson.dto";
import {NotFoundException} from "../exceptions/not.found.exception";

@Injectable()
export class LessonService {
    constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson,
                private courseService: CourseService,
                private sequelize: Sequelize) {
    }

    async getAllLessons(limit, offset):Promise<Lesson[]> {
        return await this.lessonRepository.findAll({limit: limit, offset: offset});
    }
    async getLessonById(lessonId:number):Promise<Lesson>{
        let lesson= await this.lessonRepository.findByPk(lessonId);
        if(!lesson)
            throw new NotFoundException("Lesson",lessonId);
        return lesson;
    }
    async createLesson(lessonDto: CreateLessonDto): Promise<Lesson> {
        return await this.lessonRepository.create(lessonDto);
    }

    async removeLesson(lessonId: number): Promise<void> {
        let transaction = await this.sequelize.transaction();
        try {
            await this.courseService.removeCourseToLessonByLessonId(lessonId);
            let lessonForDel= await this.lessonRepository.findByPk(lessonId);
            if(!lessonForDel)
                throw new NotFoundException('Lesson',lessonId);
            await lessonForDel.destroy();
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async updateLesson(lessonId: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
        let lesson= await this.lessonRepository.findByPk(lessonId);
        if(!lesson)
            throw new NotFoundException('Lesson',lessonId);
        return await lesson.update(updateLessonDto);
    }
}
