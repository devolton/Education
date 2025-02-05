import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import {SequelizeModule} from "@nestjs/sequelize";
import {ChatMessage} from "./model/chat.message.model";
import {ChatController} from "./chat.controller";

@Module({
  providers: [WebsocketGateway, WebsocketService],
  controllers: [ChatController],
  imports:[
      SequelizeModule.forFeature([
          ChatMessage,
      ])
  ]
})
export class WebsocketModule {}
