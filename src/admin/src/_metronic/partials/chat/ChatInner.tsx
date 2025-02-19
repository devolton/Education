import React, {FC, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import clsx from 'clsx'
import {formatTimeAgo, KTIcon,} from '../../helpers'

import ChatFooter from "../../../app/modules/apps/common/components/chat/ChatFooter.tsx";
import MessageBlock from "../../../app/modules/apps/common/components/chat/MessageBlock.tsx";
import {CustomUser} from "../../../app/modules/apps/user-management/custom-users-list/core/custom.user.model.ts";
import {useAuth} from "../../../app/modules/auth";
import {ChatMessage, ChatMessageModel} from "../../../app/modules/apps/chat/core/_chat.model.ts";
import {useSocket} from "../../../app/modules/apps/chat/core/ChatMessageSocketProvider.tsx";
import TypingAnimatedDots from "../../../app/modules/apps/chat/TypingAnimatedDots.tsx";
import {useMessages} from "../../../app/modules/apps/chat/core/ChatMessagesProvider.tsx";
import {useMessageObserver} from "../../../app/modules/apps/chat/core/message.observer.ts";

type Props = {
    isDrawer?: boolean
    receiver?: CustomUser
}


const ChatInner: FC<Props> = ({receiver, isDrawer = false}) => {
    const {socket} = useSocket();
    const {currentCustomUser} = useAuth();
    const {messages, addMessage, fetchMessages} = useMessages();
    const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollValue = useRef<number>(0);
    let fetchOffset = useRef<number>(0);
    const [isScrollButtonVisible, setIsScrollButtonVisible] = useState<boolean>(false);
    const fetchLimit = 50;
    const fetchStep = 50;

    useMessageObserver(messages, receiver);

    const [message, setMessage] = useState<string>('')
    const [isTypingVisible, setIsTypingVisible] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState(false);
    let typingTimeout: NodeJS.Timeout | null = null;
    let isNewMessageBlockVisible = true;


    const handleTyping = () => {
        if (!isTyping) {
            setIsTyping(true);
            socket.emit("typing", {userId: "your-user-id"});

            if (typingTimeout) clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                setIsTyping(false);
                socket.emit("stop-typing", {userId: "your-user-id"});
            }, 3000);
        }
    };


    const sendMessage = () => {
        const newMessage: ChatMessage = {
            id: undefined,
            senderId: currentCustomUser.id,
            receiverId: receiver.id,
            message: message
        }
        socket.emit('message', newMessage);
        setMessage('');


    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            sendMessage()
        }
    }
    const messageHandler = (message: ChatMessage) => {
        if (message.senderId === receiver.id || message.senderId === currentCustomUser.id) {
            let chatMes: ChatMessageModel = {
                id: message.id,
                sender: message.sender,
                isRead: message.isRead,
                receiver: message.receiver,
                text: message.message,
                type: (currentCustomUser.id !== message.senderId) ? "in" : "out",
                time: formatTimeAgo(message.createdAt.toLocaleString())
            };
            addMessage(chatMes);
        }

    }
    const messageInputFocusHandler = () => {
        socket.emit('start-typing', {
            receiverId: receiver.id,
            senderId: currentCustomUser.id
        });

    }
    const messageInputBlurHandler = () => {
        socket.emit('stop-typing', {
            receiverId: receiver.id,
            senderId: currentCustomUser.id
        })
    }
    const startTypingMessageHandler = (senderId: number) => {
        if (senderId === receiver.id) {
            setIsTypingVisible(true);
        }

    }
    const stopTypingMessageHandler = (senderId: number) => {
        if (senderId === receiver.id) {
            setIsTypingVisible(false);
        }
    }
    const handleScroll = () => {
        const container = containerRef.current;
        if (container.scrollTop < container.scrollHeight-500 ) {
            setIsScrollButtonVisible(true)
        }
        else{
            setIsScrollButtonVisible(false)
        }

        if (container.scrollTop === 0 && container.scrollHeight > 500) {
            fetchOffset.current += fetchStep;
            console.log(`FetchOffset: ${fetchOffset.current}`)//todo console
            fetchMessages(receiver.id, fetchLimit, fetchOffset.current, true);
            scrollValue.current = container.scrollHeight;
        }
    };
    const scrollToEndHandler = () => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    useEffect(() => {
        containerRef.current.addEventListener('scroll', handleScroll);
        if (socket) {
            socket.on('message', messageHandler);
            socket.on('start-typing', startTypingMessageHandler);
            socket.on('stop-typing', stopTypingMessageHandler);
        }
        fetchOffset.current = 0;
        console.log("useEffect");
        if (receiver)
            fetchMessages(receiver.id, fetchLimit, 0);
        return (() => {
            socket.off('message', messageHandler);
            socket.off('start-typing', startTypingMessageHandler);
            socket.off('stop-typing', stopTypingMessageHandler);
        })

    }, [receiver]); // not adding messages dependency
    useLayoutEffect(() => {
        if (containerRef.current) {
            if (scrollValue.current === 0) {
                scrollValue.current = containerRef.current.scrollHeight;
            }
            containerRef.current.scrollTop = containerRef.current.scrollHeight - scrollValue.current;
        }
    }, [messages])

    return (
        <div
            className='card-body'
            id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}
        >
            <div
                ref={containerRef}
                className={clsx('scroll-y me-n5 pe-5 overflow-y-auto', {'min-h-300px max-h-300px h-300px h-lg-auto': !isDrawer})}
                data-kt-element='messages'
                data-kt-scroll='true'
                data-kt-scroll-activate='{default: false, lg: true}'
                data-kt-scroll-max-height='auto'
                data-kt-scroll-dependencies={
                    isDrawer
                        ? '#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer'
                        : '#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
                }
                data-kt-scroll-wrappers={
                    isDrawer
                        ? '#kt_drawer_chat_messenger_body'
                        : '#kt_content, #kt_app_content, #kt_chat_messenger_body'
                }
                data-kt-scroll-offset={isDrawer ? '0px' : '5px'}
            >

                {
                    (messages.length > 0) ? messages.map((message, index) => {
                            let visibility = false;
                            if (isNewMessageBlockVisible && !message.isRead && message.type == 'in') {
                                isNewMessageBlockVisible = false;
                                visibility = true;
                            }

                            return (<MessageBlock
                                key={`message-block-${index}`}
                                isNewMessagesBlockVisible={visibility}
                                ref={(el) => (messageRefs.current[index] = el)}
                                message={message}
                                isDrawer={isDrawer}/>)
                        }) :
                        <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                            <KTIcon iconName={'message-add'} iconType={'outline'} className='fs-2'/>
                            <div
                                className="scroll-to-bottom position-absolute bottom-0 end-0 bg-primary text-white p-2 rounded"
                            >
                                ↓
                            </div>
                        </div>

                }
                <div
                    className={`hover-opacity cursor-pointer m-4 position-sticky bg-light-subtle text-white p-2 rounded opacity-75  hover-scale ${isScrollButtonVisible? 'd-block':'d-none'}`}
                    style={{width:25,
                        bottom:25
                    }}
                    onClick={scrollToEndHandler}
                >
                    ↓
                </div>

                <TypingAnimatedDots isVisible={isTypingVisible}/>
            </div>
            {/*input message block*/}
            <div
                className='card-footer pt-4'
                id={isDrawer ? 'kt_drawer_chat_messenger_footer' : 'kt_chat_messenger_footer'}
            >
        <textarea
            className='form-control form-control-flush mb-3'
            rows={1}

            onFocus={messageInputFocusHandler}
            onBlur={messageInputBlurHandler}
            data-kt-element='input'
            placeholder='Type a message'
            value={message}
            onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
            }
            }
            onKeyDown={onEnterPress}
        ></textarea>
                <ChatFooter sendMessageHandler={sendMessage}/>
            </div>
        </div>
    )
}

export {ChatInner}
