import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server} from "socket.io";
import {ChatClient} from "../model/chat.client.model";

@WebSocketGateway({
    cors:true,
    namespace:'/video-chat'
})
export class VideoChatGateway implements OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit {

    @WebSocketServer() server: Server;
    private clients:Array<ChatClient> = [];


    handleConnection(client: any, ...args: any[]) {
       console.log("Video gateway connection")
    }
    afterInit(server: any) {
        console.log("init");
    }
    handleDisconnect(client: any) {
        console.log("Video gateway disconnect")
    }
}