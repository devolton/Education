import { Module } from '@nestjs/common';
import { CourseService } from './service/course.service';
import { CourseController } from './course.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {CourseSchedule} from "./model/course.schedule.model";
import {Course} from "./model/course.model";
import {CourseToLesson} from "./model/course.to.lesson.model";
import {Lesson} from "../lesson/lesson/lesson.model";
import {JwtModule} from "@nestjs/jwt";
import {PaginationModule} from "../pagination/pagination.module";
import {FilesModule} from '../files/files.module'

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports:[
      SequelizeModule.forFeature([CourseSchedule, Course,Lesson, CourseToLesson]),
      JwtModule,
      PaginationModule,
      FilesModule
  ],
    exports:[CourseService]
})
export class CourseModule {}
