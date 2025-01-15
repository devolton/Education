import { Module } from '@nestjs/common';
import { PostCategoryService } from './post-category.service';
import { PostCategoryController } from './post-category.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {PostCategory} from "./model/post.category.model";
import {JwtModule} from "@nestjs/jwt";
import {PaginationModule} from "../pagination/pagination.module";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [PostCategoryController],
  providers: [PostCategoryService],
  imports:[
      SequelizeModule.forFeature([PostCategory]),
      JwtModule,
      PaginationModule,
      FilesModule
  ],
    exports:[
        PostCategoryService
    ]
})
export class PostCategoryModule {}
