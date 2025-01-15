import { Module } from '@nestjs/common';
import { NavigationService } from './service/navigation.service';
import { NavigationController } from './navigation.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Navigation} from "./model/navigation.model";
import {PaginationModule} from "../pagination/pagination.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [NavigationController],
  providers: [NavigationService],
  imports:[
      SequelizeModule.forFeature([Navigation]),
      JwtModule,
      PaginationModule
  ]
})
export class NavigationModule {}
