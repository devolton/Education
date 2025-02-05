import {Controller, Get} from "@nestjs/common";
import {WebsocketService} from "./websocket.service";


@Controller('chat')
export class ChatController {
    constructor(private readonly websocketService: WebsocketService) {
    }
    @Get()
    async Get(){
        return "I m chat controller";
    }

}