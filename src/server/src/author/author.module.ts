import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Author} from "./model/author.mode";
import {JwtModule} from "@nestjs/jwt";
import {PaginationModule} from "../pagination/pagination.module";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  imports:[
      SequelizeModule.forFeature([Author]),
      JwtModule,
      PaginationModule,
      FilesModule
  ]
})
export class AuthorModule {}
