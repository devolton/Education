import Socket = SocketIOClient.Socket;
import {Context, createContext, FC, useContext, useEffect, useState} from "react";
import {WithChildren} from "../../../../../_metronic/helpers";
import {useAuth} from "../../../auth";
import {connect} from "socket.io-client";
import {Config} from "../../../../../env.config.ts";

interface VideoChatSocketContextProps{
    socket: Socket;
}
const initialVideoChatSocket = {
    socket: null,
}
const VideoChatSocketContext:Context<VideoChatSocketContextProps> = createContext<VideoChatSocketContextProps>(initialVideoChatSocket);

const useVideoSocket = (()=>useContext(VideoChatSocketContext));



const VideoChatSocketProvider:FC<WithChildren> = ({children}) => {
    const {currentCustomUser} = useAuth();
    const [socket,setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        let socket = connect(Config.PATH.SERVER.VIDEO_CHAT_GATEWAY_URL,{
            query:{userId:currentCustomUser.id}
        })
        setSocket(socket);
        console.log("Video socket use effect! ");
        return(()=>{
            if(socket){
                socket.disconnect();
            }
        })

    }, []);


    return <VideoChatSocketContext.Provider value={{socket}}>
        {children}
    </VideoChatSocketContext.Provider>

}

export {
    useVideoSocket,
    VideoChatSocketProvider,
}