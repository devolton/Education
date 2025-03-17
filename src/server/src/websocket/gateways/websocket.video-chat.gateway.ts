import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {ChatClient} from "../model/chat.client.model";
import {ClientsIdPair} from "../type/clients.id.pair";
import {VideoChatService} from "../services/video.chat.service";
import {ChatSimpleUser} from "../type/chat.simple.user";
import {CallAnswerResponse} from "../type/call.answer.response";
import {HttpException} from "@nestjs/common";


@WebSocketGateway({
    cors: true,
    namespace: '/video-chat'
})
export class VideoChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    constructor(private readonly videoChatService: VideoChatService) {
    }

    @WebSocketServer() server: Server;
    private clients: Array<ChatClient> = [];

    async handleConnection(client: any, ...args: any[]) {
        console.log("CLIENT CONNECTED!");
        let userId: number = parseInt(client.handshake.query.userId as string);
        if (this.clients.some(c => userId === c.user_id)) return;//todo remove
        this.clients.push({
            user_id: userId,
            connection_id: client.id
        });
        console.log(this.clients);
    }

    async afterInit(server: any) {
        console.log("INIT VIDEO CHAT GATEWAY");
    }

    async handleDisconnect(client: Socket) {
        console.log("CLIENT DISCONNECTED!");
        console.log(client.id);
        this.clients = this.clients.filter(oneClient => oneClient.connection_id !== client.id);
    }

    // 1. Пользователь отправляет предложение (offer) другому пользователю
    @SubscribeMessage('call-user')
    async handleCallUser(@MessageBody()payload: { clients: ClientsIdPair; offer: RTCSessionDescriptionInit }) {
        console.log(`Calling to ${payload.clients.receiverId}`);
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === payload.clients.receiverId);
        let senderObj = this.clients.find(oneClient => oneClient.user_id === payload.clients.senderId);
        if (receiverObj && senderObj) {
            let simpleUser:ChatSimpleUser =await this.videoChatService.getUserLoginAndAvatar(senderObj.user_id);
            let clientsPair: ClientsIdPair = {
                receiverId: receiverObj.user_id,
                senderId: senderObj.user_id
            }
            this.server.to(receiverObj.connection_id).emit('incoming-call', {clientsPair, simpleUser, offer: payload.offer});
        }

    }

    // 2. Пользователь принимает вызов и отправляет ответ (answer)
    @SubscribeMessage('answer-call')
    async handleAnswerCall( @MessageBody() payload:CallAnswerResponse ) {
        console.log(`Answering to ${payload.clientsIdPair.receiverId}`);
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === payload.clientsIdPair.receiverId);
        if (receiverObj) {
            this.server.to(receiverObj.connection_id).emit('call-answered', payload);
        }
    }

    // 3. Передача ICE-кандидатов
    @SubscribeMessage('ice-candidate')
    async handleIceCandidate(@MessageBody() payload: {to: number, fromId:number, candidate: RTCIceCandidate }) {
        console.log(`Ice candidate was ${payload.to}`);
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === payload.to);
        if (receiverObj) {
            this.server.to(receiverObj.connection_id).emit('ice-candidate', {
                from: payload.fromId,
                candidate: payload.candidate
            });
        }

    }
    @SubscribeMessage('stop-video')
    async disconnect(@MessageBody() payload: {to: number, from:number}) {
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === payload.to);
        let senderObj = this.clients.find(oneClient => oneClient.user_id === payload.from);
        if(receiverObj  && senderObj) {
            this.server.to(receiverObj.connection_id).emit('stop-remote-video', {to: payload.to, from:payload.from});
        }

    }
}