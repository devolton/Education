import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {LessonService} from './lesson.service';
import {CreateLessonDto} from "./dto/create.lesson.dto";
import {Lesson} from "./lesson/lesson.model";
import {RoleGuard} from "../token/guard/role.guard";
import {Roles} from "../decorators/roles.auth.decorator";
import {UpdateLessonDto} from "./dto/update.lesson.dto";

@Controller('lessons')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {
    }
    @Get()
    async getLessons(@Body('limit')limit:number,
                     @Body('offset') offset:number):Promise<Lesson[]>{
        return await this.lessonService.getAllLessons(limit,offset);
    }
    @Get('/:id')
    async getLessonById(@Param('id')lessonId:number):Promise<Lesson>{
        return await this.lessonService.getLessonById(lessonId);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Post()
    async createLesson(@Body('lesson') lessonDto: CreateLessonDto): Promise<Lesson> {
        return await this.lessonService.createLesson(lessonDto);

    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async deleteLesson(@Param('id') lessonId: number): Promise<void> {
        return await this.lessonService.removeLesson(lessonId);
    }

    @Put('/:id')
    async updateLesson(@Param('id') lessonId:number,
                       @Body('lesson') updateLessonDto:UpdateLessonDto):Promise<Lesson>{
        return await this.lessonService.updateLesson(lessonId,updateLessonDto);
    }


}
