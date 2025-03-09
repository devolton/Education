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
import {ClientsIdPair} from "../model/clients.id.pair";


@WebSocketGateway({
    cors: true,
    namespace: '/video-chat'
})
export class VideoChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

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
        console.log(client);
        this.clients = this.clients.filter(oneClient => oneClient.connection_id !== client.id);
        console.log(this.clients);
    }

    // 1. Пользователь отправляет предложение (offer) другому пользователю
    @SubscribeMessage('call-user')
    async handleCallUser(client: Socket, payload: { clients: ClientsIdPair; offer: RTCSessionDescriptionInit }) {
        console.log(`Calling to ${payload.clients.receiverId}`);
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === payload.clients.receiverId);
        let senderObj = this.clients.find(oneClient => oneClient.user_id === payload.clients.senderId);
        if (receiverObj && senderObj) {
            let clientsPair: ClientsIdPair = {
                receiverId: receiverObj.user_id,
                senderId: receiverObj.user_id
            }
            this.server.to(receiverObj.connection_id).emit('incoming-call', {clientsPair, offer: payload.offer});
        }

    }

    // 2. Пользователь принимает вызов и отправляет ответ (answer)
    @SubscribeMessage('answer-call')
    async handleAnswerCall(client: Socket, payload: {
        clientIdsPair: ClientsIdPair;
        answer: RTCSessionDescriptionInit
    }) {
        console.log(`Answering to ${payload.clientIdsPair.receiverId}`);
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === payload.clientIdsPair.receiverId);
        if (receiverObj) {
            this.server.to(receiverObj.connection_id).emit('call-answered', {answer: payload.answer});
        }
    }

    // 3. Передача ICE-кандидатов
    @SubscribeMessage('ice-candidate')
    async handleIceCandidate(client: Socket, payload: { from: number; to: number; candidate: RTCIceCandidate }) {
        console.log(`Ice candidate was ${payload.to}`);
        let receiverObj = this.clients.find(oneClient => oneClient.user_id === payload.to);
        if (receiverObj) {
            this.server.to(receiverObj.connection_id).emit('ice-candidate', {
                from: client.id,
                candidate: payload.candidate
            });
        }

    }
}