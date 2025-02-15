import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {ChatService} from './chat.service';
import {Server, Socket} from "socket.io";
import {ChatClientDto} from "./dto/chat.client.dto";
import {CreateChatMessageDto} from "./dto/create.chat.message.dto";
import {ChatMessage} from "./model/chat.message.model";
import {ClientsIdPairDto} from "./dto/clients.id.pair.dto";

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
        let userId: number = parseInt(client.handshake.query.userId as string);
        this.clients.push({
            user_id: userId,
            connection_id: client.id
        });
        let onlineIds: Array<number> = this.clients.map(oneClient => oneClient.user_id);
        this.clients.forEach(client => {
            console.log(`Client: ${client.connection_id} ${client.user_id}`);
        });
        this.server.emit('online', onlineIds);

    }

    handleDisconnect(client: Socket) {
        console.log(`CLIENT DISCONNECTED: ${client.id}`);
        this.clients = this.clients.filter(oneClient => oneClient.connection_id !== client.id);
        let onlineIds: Array<number> = this.clients.map(oneClient => oneClient.user_id);
        console.log(this.clients);
        this.server.emit('online', onlineIds);
    }

    afterInit(server: Server) {
        console.log("Websocket server initialized");

    }
    @SubscribeMessage('start-typing')
    async startTypingHandler(@MessageBody() idsPair:ClientsIdPairDto) {
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === idsPair.receiverId);
        if(receiverObj) {
            this.server.to(receiverObj.connection_id).emit('start-typing', idsPair.senderId);
        }

    }
    @SubscribeMessage('stop-typing')
    async stopTypingHandler(@MessageBody() idsPair:ClientsIdPairDto) {
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === idsPair.receiverId);
        if(receiverObj) {
            this.server.to(receiverObj.connection_id).emit('stop-typing', idsPair.senderId);
        }
    }
    @SubscribeMessage('set-read-message')
    async readLastMessageHandler(@MessageBody('message_id') messageId:number,
                                 @MessageBody('sender_id') senderId:number,
                                 @MessageBody('receiver_id') receiverId:number) {
        console.log(`MESSAGE WITH ${messageId} WAS READ. SENDER ${senderId} | RECEIVER: ${receiverId}`);
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === receiverId);
        let senderObj = this.clients.find(oneClient => oneClient.user_id === senderId);
        await this.chatService.setChatMessageReadState(messageId);
        if(receiverObj) {
            console.log(receiverObj)
            this.server.to(receiverObj.connection_id).emit("set-read-message", messageId,senderId,receiverId);
        }
        // if(senderObj) {
        //     console.log("SENDER");
        //     this.server.to(senderObj.connection_id).emit("set-read-message", messageId,senderId,receiverId);
        // }


    }

    @SubscribeMessage("message")
    async sendMessageHandler(@MessageBody() createChatMessageDto: CreateChatMessageDto) {
        let chatMessage: ChatMessage = await this.chatService.createChatMessage(createChatMessageDto);
        let receiverObj = this.clients.find(oneClient => oneClient.user_id == chatMessage.receiverId);
        let senderObj = this.clients.find(oneClient => oneClient.user_id == chatMessage.senderId);

        if (chatMessage) {
            if (receiverObj)
                this.server.to(receiverObj.connection_id).emit("message", chatMessage);
            if (senderObj){
                this.server.to(senderObj.connection_id).emit("message", chatMessage);
                this.server.to(senderObj.connection_id).emit("set-sent-message", chatMessage);
                }
        }

    }


}
