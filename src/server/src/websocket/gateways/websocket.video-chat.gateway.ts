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


@WebSocketGateway({
    cors: true,
    namespace: '/video-chat'
})
export class VideoChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    @WebSocketServer() server: Server;
    private clients: Array<ChatClient> = [];

    handleConnection(client: any, ...args: any[]) {
        console.log("CLIENT CONNECTED!");
        let userId: number = parseInt(client.handshake.query.userId as string);
        if(this.clients.some(c=>userId ===c.user_id)) return;//todo remove
        this.clients.push({
            user_id: userId,
            connection_id: client.id
        });
        console.log(this.clients);
    }

    afterInit(server: any) {
        console.log("INIT VIDEO CHAT GATEWAY");
    }

    handleDisconnect(client: Socket) {
        console.log("CLIENT DISCONNECTED!");
        console.log(client);
        this.clients = this.clients.filter(oneClient => oneClient.connection_id !== client.id);
        console.log(this.clients);
    }

    // 1. Пользователь отправляет предложение (offer) другому пользователю
    @SubscribeMessage('call-user')
    handleCallUser(client: Socket, payload: { from:number;to:number; offer: RTCSessionDescriptionInit }) {
        console.log(`Calling to ${payload.to}`);
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === payload.to);
        if (receiverObj) {

            this.server.to(receiverObj.connection_id).emit('incoming-call', { from: client.id, offer: payload.offer });
        }

    }

    // 2. Пользователь принимает вызов и отправляет ответ (answer)
    @SubscribeMessage('answer-call')
    handleAnswerCall(client: Socket, payload: {from:number; to: string; answer: RTCSessionDescriptionInit }) {
        console.log(`Answering to ${payload.to}`);
        let receiverObj = this.clients.find(oneClient => oneClient.connection_id === payload.to);
        if(receiverObj) {
            this.server.to(receiverObj.connection_id).emit('call-answered', { from: client.id, answer: payload.answer });
        }

    }

    // 3. Передача ICE-кандидатов
    @SubscribeMessage('ice-candidate')
    handleIceCandidate(client: Socket, payload: {from:number; to: number; candidate: RTCIceCandidate }) {
        console.log(`Ice candidate was ${payload.to}`);
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === payload.to);
        if(receiverObj) {
            this.server.to(receiverObj.connection_id).emit('ice-candidate', { from: client.id, candidate: payload.candidate });
        }

    }
}