import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Newsletter} from "./model/newsletter.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService],
  imports:[
      SequelizeModule.forFeature([Newsletter]),
      JwtModule
  ]
})
export class NewsletterModule {}
