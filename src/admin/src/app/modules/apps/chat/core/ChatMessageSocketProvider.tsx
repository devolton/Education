import {Context, createContext, FC, useContext, useEffect, useState} from "react";
import {ID, WithChildren} from "../../../../../_metronic/helpers";
import {useAuth} from "../../../auth";
import {connect} from "socket.io-client";
import Socket = SocketIOClient.Socket;

interface SocketContextProps {
    socket: Socket | null;
    onlineUserIds:Array<ID>
}

const initialSocket: SocketContextProps = {socket: null,onlineUserIds:[]};
const ChatMessageSocketContext: Context<SocketContextProps> = createContext<SocketContextProps>(initialSocket);

const useSocket = (() => useContext(ChatMessageSocketContext));

const ChatMessageSocketProvider: FC<WithChildren> = ({children}) => {
    const {currentCustomUser} = useAuth();
    const [onlineUserIds,setOnlineUsersIds] = useState<Array<ID>>([]);
    const [socket, setSocket] = useState<Socket | null>(null);



    useEffect(() => {
        const socket: Socket = connect("http://localhost:3001/chat", {
            query: {userId: currentCustomUser.id},
        });
        setSocket(socket);
        socket.on('online',connectionHandler);
        return (() => {
            if (socket) {
                socket.off('online',connectionHandler);
                console.log("disconnect")
                socket.disconnect();
            }
        })
    }, []);


    const connectionHandler =(onlineUserIds:Array<ID>)=>{
        console.log(`Online connection`);
        console.log(onlineUserIds)
        setOnlineUsersIds(onlineUserIds);
    }

    return (
        <ChatMessageSocketContext.Provider value={{socket,onlineUserIds}}>
            {children}
        </ChatMessageSocketContext.Provider>
    )
}



export {
    ChatMessageSocketProvider,
    useSocket
}