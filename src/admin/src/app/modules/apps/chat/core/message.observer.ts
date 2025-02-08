import { useEffect, useRef } from "react";

export const useMessageObserver = (messages) => {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log("Intersecting", entry);
                        const messageId = entry.target.getAttribute("message-id");
                        if (messageId) {
                            //onReadMessage(messageId);
                            console.log("Message ID: ", messageId);
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
