import {createContext, FC, useContext, useEffect, useState} from "react";
import {WithChildren} from "../../../../../_metronic/helpers";

interface VideoChatPeerConnectionProps {
    peerConnection:RTCPeerConnection
}
const initialVideoChatPeerConnection:VideoChatPeerConnectionProps = {
    peerConnection:null

}

const VideoChatPeerConnectionContext = createContext<VideoChatPeerConnectionProps>(initialVideoChatPeerConnection);

const useVideoChatPeerConnection = (()=>useContext(VideoChatPeerConnectionContext));


const VideoChatPeerConnectionProvider:FC<WithChildren> = ({children}) => {
    const [peerConnection,setPeerConnection]= useState<RTCPeerConnection>(null);

    useEffect(() => {
        setPeerConnection(new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
        }));
        return (()=>{
            peerConnection.close();
            setPeerConnection(null);
        })
    }, []);

    return <VideoChatPeerConnectionContext.Provider value={{peerConnection}}>
        {children}
    </VideoChatPeerConnectionContext.Provider>

}

export {
    VideoChatPeerConnectionProvider,
    useVideoChatPeerConnection,
}
