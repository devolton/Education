import {useEffect, useRef} from "react";
import {ChatMessageModel} from "./_chat.model.ts";
import {useSocket} from "./ChatMessageSocketProvider.tsx";
import {useAuth} from "../../../auth";
import {CustomUser} from "../../user-management/custom-users-list/core/custom.user.model.ts";
import {useUnreadMessagesCount} from "./ChatMessagesProvider.tsx";

export const useMessageObserver = (messages:Array<ChatMessageModel>,receiver:CustomUser) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const {currentCustomUser} = useAuth();
    const {refreshUnreadMessagesCount}=useUnreadMessagesCount(receiver?.id);
    const {socket} = useSocket();

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const messageId = entry.target.getAttribute("message-id");
                        if(messageId) {
                            let mesId = parseInt(messageId);
                            let messageForUpdate = messages.find(oneMessage => oneMessage.id === mesId);

                            if (messageForUpdate && !messageForUpdate.isRead && messageForUpdate.type === 'in') {
                                console.log(messageForUpdate);
                                socket.emit("set-read-message", {
                                    message_id: mesId,
                                    sender_id: currentCustomUser.id,
                                    receiver_id: receiver.id
                                });
                                messageForUpdate.isRead = true;
                                refreshUnreadMessagesCount();
                            }
                        }

                    }
                });
            },
            { root: null, rootMargin: "0px", threshold: 0.9 }
        );

        const elements = document.querySelectorAll("[message-id]");
        elements.forEach((el) => observer.current?.observe(el));

        return () => {
            observer.current?.disconnect();
        };
    }, [messages]);
};
