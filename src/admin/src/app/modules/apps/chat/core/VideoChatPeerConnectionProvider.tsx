import {createContext, FC, useContext, useEffect, useState} from "react";
import {WithChildren} from "../../../../../_metronic/helpers";
import {useVideoSocket} from "./VideoChatSocketProvider.tsx";
import {ClientIdPair, IncomeCallAnswerResponse, IncomeCallAnswerStatus} from "./_chat.model.ts";

interface VideoChatPeerConnectionProps {
    peerConnection: RTCPeerConnection,
    createPeerConnection: () => void,
    closePeerConnection: () => void,
    sendAnswer: (offer: RTCSessionDescriptionInit, clientIds: ClientIdPair) => Promise<void>,
}

const initialVideoChatPeerConnection: VideoChatPeerConnectionProps = {
    peerConnection: null,
    closePeerConnection: () => {
    },
    createPeerConnection: () => {
    },
    sendAnswer: async (offer: RTCSessionDescriptionInit, clientIds: ClientIdPair) => {

    }


}

const VideoChatPeerConnectionContext = createContext<VideoChatPeerConnectionProps>(initialVideoChatPeerConnection);

const useVideoChatPeerConnection = (() => useContext(VideoChatPeerConnectionContext));

//todo add   offer?: RTCSessionDescriptionInit,
const VideoChatPeerConnectionProvider: FC<WithChildren> = ({children}) => {
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(null);
    const {socket} = useVideoSocket();
    useEffect(() => {
        return (() => {
            closePeerConnection();
        })
    }, []);

    const sendAnswer = async (offer: RTCSessionDescriptionInit, clientIds: ClientIdPair) => {
        const answerStatus: IncomeCallAnswerStatus = "answered";
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        console.log("REMOTE DESCRIPTION INIT")
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        const payload: IncomeCallAnswerResponse = {
            clientsIdPair: clientIds,
            incomeCallAnswerStatus: answerStatus,
            answer: answer
        };
        socket?.emit('answer-call', payload);
        console.log(peerConnection.getReceivers());
    }


    const createPeerConnection = () => {
        setPeerConnection(new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
        }));
        console.log("Crate peer connection");
    }
    const closePeerConnection = () => {
        peerConnection.close();
        setPeerConnection(null);
        console.log("Close peer connection");
    }

    return <VideoChatPeerConnectionContext.Provider
        value={{peerConnection, createPeerConnection, closePeerConnection, sendAnswer}}>
        {children}
    </VideoChatPeerConnectionContext.Provider>

}

export {
    VideoChatPeerConnectionProvider,
    useVideoChatPeerConnection,
}
