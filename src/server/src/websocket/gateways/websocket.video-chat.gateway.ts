import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {ChatClient} from "../model/chat.client.model";

@WebSocketGateway({
    cors:true,
    namespace:'/video-chat'
})
export class VideoChatGateway implements OnGatewayConnection,OnGatewayDisconnect,OnGatewayInit {

    @WebSocketServer() server: Server;
    private clients:Array<ChatClient> = [];

    handleConnection(client: any, ...args: any[]) {
        let userId: number = parseInt(client.handshake.query.userId as string);
        this.clients.push({
            user_id: userId,
            connection_id: client.id
        });
        console.log(this.clients);
    }
    afterInit(server: any) {
        console.log("INIT VIDEO CHAT GATEWAY");
    }
    handleDisconnect(client: any) {
      this.clients=this.clients.filter(oneClient=>oneClient.connection_id!==client.id);
      console.log(this.clients);
    }
    @SubscribeMessage('join')
    handleJoin(client: Socket, room: string) {
        client.join(room);
        console.log(`👥 Пользователь ${client.id} зашёл в комнату: ${room}`);
    }

    @SubscribeMessage('signal')
    handleSignal(client: Socket, payload: { to: string; data: any }) {
        console.log(`📡 Сигнал от ${client.id} -> ${payload.to}`);
        this.server.to(payload.to).emit('signal', { from: client.id, data: payload.data });
    }
}