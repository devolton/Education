import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Lesson} from "./lesson/lesson.model";
import {JwtModule} from "@nestjs/jwt";
import {CourseModule} from "../course/course.module";

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports:[
      SequelizeModule.forFeature([Lesson]),
      JwtModule,
      CourseModule
  ]
})
export class LessonModule {}
