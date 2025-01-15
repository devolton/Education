import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Message} from "./model/message.model";
import {JwtModule} from "@nestjs/jwt";
import {PaginationModule} from "../pagination/pagination.module";

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports:[
      SequelizeModule.forFeature([Message]),
      JwtModule,
      PaginationModule
  ]
})
export class MessageModule {}
