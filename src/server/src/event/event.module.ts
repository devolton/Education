import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import EventDetail from "./model/eventDetail.model";
import {Event} from './model/event.model'
import {EventVenue} from "./model/eventVenue.model";
import {JwtModule} from "@nestjs/jwt";
import {PaginationModule} from "../pagination/pagination.module";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports:[
    SequelizeModule.forFeature([ EventVenue,Event,EventDetail]),
      JwtModule,
      PaginationModule,
      FilesModule
  ]
})
export class EventModule {}
