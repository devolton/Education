import {Context, createContext, FC, useContext, useEffect, useMemo, useState} from "react";
import Socket = SocketIOClient.Socket;
import {WithChildren} from "../../../../../_metronic/helpers";
import {useAuth} from "../../../auth";
import {connect} from "socket.io-client";

interface SocketContextProps {
    socket: Socket | null;
}

const initialSocket: SocketContextProps = {socket: null}
const ChatMessageSocketContext: Context<SocketContextProps> = createContext<SocketContextProps>(initialSocket);

const useSocket = (() => useContext(ChatMessageSocketContext));

const ChatMessageSocketProvider: FC<WithChildren> = ({children}) => {
    const {currentCustomUser} = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        const socket: Socket = connect("http://localhost:3001", {
            query: {userId: currentCustomUser.id},
        });
        setSocket(socket);
        return (() => {
            if (socket)
                socket.disconnect();
        })
    }, []);

    return (
        <ChatMessageSocketContext.Provider value={{socket}}>
            {children}
        </ChatMessageSocketContext.Provider>
    )
}

export {
    ChatMessageSocketProvider,
    useSocket
}