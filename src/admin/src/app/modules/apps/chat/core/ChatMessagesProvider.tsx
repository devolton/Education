import {formatTimeAgo, ID, WithChildren} from "../../../../../_metronic/helpers";
import {ChatMessage, ChatMessageModel} from "./_chat.model.ts";
import React, {Context, createContext, FC, useContext, useEffect, useState} from "react";
import {getLastReceiverMessage, getUnreadReceiverMessagesCount, getUserMessages} from "./_chat.request.ts";
import {useAuth} from "../../../auth";

interface ChatMessagesContextProps {
    fetchMessages: (receiverId: ID) => void,
    messages: Array<ChatMessageModel>,
    addMessage: (message: ChatMessageModel) => void,
}

const initialChatMessages: ChatMessagesContextProps = {
    fetchMessages: null,
    messages: [],
    addMessage: null


}
const ChatMessagesContext: Context<ChatMessagesContextProps> = createContext<ChatMessagesContextProps>(initialChatMessages);

const ChatMessagesProvider: FC<WithChildren> = ({children}) => {
    const {currentCustomUser} = useAuth();
    const [messages, setMessages] = useState<Array<ChatMessageModel>>([]);

    const fetchMessages = (receiverId: ID) => {
        console.log("FETCH MESSAGES");
        if (receiverId) {
            getUserMessages(receiverId).then(data => {
                let temp: Array<ChatMessageModel> = [];
                data.forEach(oneMessage => {
                    temp.push({
                        id: oneMessage.id,
                        isRead:oneMessage.isRead,
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

    const addMessage = (message: ChatMessageModel) => {
        setMessages((prev) => [...prev, message]);
    }



    return <ChatMessagesContext.Provider value={{
        fetchMessages,
        addMessage,
        messages
    }}>
        {children}
    </ChatMessagesContext.Provider>
}
const useMessages = (() => useContext(ChatMessagesContext));

const useUnreadMessagesCount = (receiverId: ID) => {
    const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(0);

    const {messages} = useMessages();
    const refreshUnreadMessagesCount=()=>{
        getUnreadReceiverMessagesCount(receiverId)
            .then((data: number) => {
                setUnreadMessagesCount(data);
                //console.log(`Receiver: ${receiverId} | Unread: ${unreadMessagesCount}`);
            })

    }
    const forceRefreshUnreadMessagesCount = (id: ID) => {
        getUnreadReceiverMessagesCount(id)
            .then((data: number) => {
                setUnreadMessagesCount(prevCount => {
                    //console.log(`Previous count: ${prevCount}, New count: ${data}`);
                    return data;
                });
            });

    };

    useEffect(() => {
        console.log("unread use effect")
        refreshUnreadMessagesCount();

    }, [messages,receiverId]);
    return {unreadMessagesCount,refreshUnreadMessagesCount,forceRefreshUnreadMessagesCount};


}
const useLastMessageTime = (receiverId: ID) => {
    const [lastMessageTime, setLastMessageTime] = useState<string>("");
    const {messages} = useMessages();
    useEffect(() => {
        getLastReceiverMessage(receiverId)
            .then((data:ChatMessage)=>{
                if(data)
                    setLastMessageTime(formatTimeAgo(data.createdAt.toLocaleString()));
            })
    }, [messages]);
    return lastMessageTime;
}

export {
    useMessages,
    ChatMessagesProvider,
    useUnreadMessagesCount,
    useLastMessageTime
}