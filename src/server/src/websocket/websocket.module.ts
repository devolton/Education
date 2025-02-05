import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { WebsocketGateway } from './websocket.gateway';
import {SequelizeModule} from "@nestjs/sequelize";
import {ChatMessage} from "./model/chat.message.model";
import {ChatController} from "./chat.controller";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [WebsocketGateway, ChatService],
  controllers: [ChatController],
  imports:[
      SequelizeModule.forFeature([
          ChatMessage,
      ]),
      JwtModule
  ]
})
export class WebsocketModule {}
