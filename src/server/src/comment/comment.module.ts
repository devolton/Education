import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentController } from './comment.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Comment} from './model/comment.model'
import {CommentToPost} from "./model/comment.to.post.model";
import {CommentToCourse} from "./model/comment.to.course.model";
import {CommentToPostService} from "./service/comment.to.post.service";
import {CommentToCourseService} from "./service/comment.to.course.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentToPostService, CommentToCourseService],
  imports:[
      SequelizeModule.forFeature([Comment,CommentToPost, CommentToCourse]),
      JwtModule
  ]
})
export class CommentModule {}
