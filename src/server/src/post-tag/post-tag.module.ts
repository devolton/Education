import { Module } from '@nestjs/common';
import { PostTagService } from './post-tag.service';
import { PostTagController } from './post-tag.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {PostTag} from "./model/post.tag.model";
import {Post} from "../post/model/post.model";
import {PostToTag} from "../post/model/post.to.tag.model";
import {JwtModule} from "@nestjs/jwt";
import {PaginationModule} from "../pagination/pagination.module";

@Module({
  controllers: [PostTagController],
  providers: [PostTagService],
  imports:[
      SequelizeModule.forFeature([PostTag, Post, Post,PostToTag]),
      JwtModule,
      PaginationModule
  ],exports:[
      PostTagService
    ]

})
export class PostTagModule {}
