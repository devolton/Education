import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {ChatService} from './chat.service';
import {Server, Socket} from "socket.io";
import {ChatMessageDto} from "./dto/chat.message.dto";
import {ChatClientDto} from "./dto/chat.client.dto";

@WebSocketGateway({
    cors: true
})
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) {
    }

    private clients: Array<ChatClientDto> = [];

    @WebSocketServer() server: Server;

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
        console.log(client.rooms);
        let login = client.handshake.query.login as string;
        this.clients.push({
            login: login,
            id: client.id
        });
        console.log(`Client count: ${this.clients.length}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.clients = this.clients.filter(oneClient => oneClient.id !== client.id);
        console.log(this.clients);

    }

    afterInit(server: Server) {
        console.log("Websocket server initialized");

    }

    @SubscribeMessage("message")
    handleMessage(@MessageBody() messageObj: ChatMessageDto) {
        let receiverObj = this.clients.find(oneClient => oneClient.login === messageObj.receiverLogin);
        if (receiverObj) {
            let receiverId = receiverObj.id;
            this.server.to(receiverId).emit("message", `From: ${messageObj.senderLogin} | Message: ${messageObj.message}`);
        }
    }

}
