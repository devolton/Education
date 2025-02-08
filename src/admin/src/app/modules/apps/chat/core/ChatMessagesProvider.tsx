import {formatTimeAgo, ID, WithChildren} from "../../../../../_metronic/helpers";
import {ChatMessageModel} from "./_chat.model.ts";
import React, {Context, createContext, FC, useContext, useEffect, useState} from "react";
import {getUserMessages} from "./_chat.request.ts";
import {useAuth} from "../../../auth";

interface ChatMessagesContextProps{
    fetchMessages:(receiverId:ID)=>void,
    messages:Array<ChatMessageModel>,
    addMessage:(message:ChatMessageModel)=>void,
    lastMessageTime:string
}

const initialChatMessages:ChatMessagesContextProps ={
    fetchMessages:null,
    messages:[],
    addMessage:null,
    lastMessageTime:'Now',


}
const ChatMessagesContext:Context<ChatMessagesContextProps> = createContext<ChatMessagesContextProps>(initialChatMessages);

const ChatMessagesProvider:FC<WithChildren> = ({children}) => {
    const {currentCustomUser}= useAuth();
    const [messages,setMessages] = useState<Array<ChatMessageModel>>([]);
    const [lastMessageTime, setLastMessageTime] = useState<string>('Now');

    const fetchMessages=(receiverId:ID)=>{
        if(receiverId){
            getUserMessages(receiverId).then(data => {
                let temp: Array<ChatMessageModel> = [];
                data.forEach(oneMessage => {
                    temp.push({
                        time: formatTimeAgo(oneMessage.createdAt.toLocaleString()),
                        type: (oneMessage.senderId !== currentCustomUser.id) ? "in" : 'out',
                        text: oneMessage.message,
                        receiver: oneMessage.receiver,
                        sender: oneMessage.sender
                    })
                })
                setMessages(temp);
            })
        }

    }
    const addMessage=(message:ChatMessageModel)=>{
        setMessages((prev) => [...prev, message]);
    }
    const getLastMessageTime=()=>{
        console.log("last time mes func")
        if(messages.length>0){
            let lastMesTime = messages[messages.length - 1].time;
            setLastMessageTime(lastMesTime);
        }
    }
    useEffect(() => {

    }, [messages]);

    return <ChatMessagesContext.Provider value={{fetchMessages,addMessage,messages,lastMessageTime}}>
        {children}
    </ChatMessagesContext.Provider>
}
const useMessages=(()=>useContext(ChatMessagesContext));

export {
    useMessages,
    ChatMessagesProvider
}