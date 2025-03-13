import {forwardRef, Module} from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { WebsocketGateway } from './gateways/websocket.gateway';
import {SequelizeModule} from "@nestjs/sequelize";
import {ChatMessage} from "./model/chat.message.model";
import {ChatController} from "./controllers/chat.controller";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {VideoChatGateway} from "./gateways/websocket.video-chat.gateway";
import {VideoChatService} from "./services/video.chat.service";

@Module({
  providers: [WebsocketGateway,VideoChatGateway, ChatService,VideoChatService],
  controllers: [ChatController],
  imports:[
      forwardRef(()=>UserModule),
      SequelizeModule.forFeature([
          ChatMessage,
      ]),
      JwtModule
  ]
})
export class WebsocketModule {}
