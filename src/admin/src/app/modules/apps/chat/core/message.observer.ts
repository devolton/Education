import { useEffect, useRef } from "react";
import {ChatMessageModel} from "./_chat.model.ts";
import {setChatMessageReadState} from "./_chat.request.ts";

export const useMessageObserver = (messages:Array<ChatMessageModel>) => {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const messageId = entry.target.getAttribute("message-id");
                        const messageType = entry.target.getAttribute("message-type");
                        console.log(messageId);
                        if (messageId && messageType === 'in') {
                            setChatMessageReadState(parseInt(messageId));
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
