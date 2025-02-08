import {FC, useEffect, useState} from 'react'
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

type Props = {
    isDrawer?: boolean
    receiver?: CustomUser
}


const ChatInner: FC<Props> = ({receiver, isDrawer = false}) => {
    const {socket} = useSocket();
    const {currentCustomUser} = useAuth();
    const {messages,addMessage,fetchMessages} = useMessages();

    const [message, setMessage] = useState<string>('')
    const [isTypingVisible, setIsTypingVisible] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState(false);
    let typingTimeout: NodeJS.Timeout | null = null;


    const handleTyping = () => {
        if (!isTyping) {
            setIsTyping(true);
            socket.emit("typing", {userId: "your-user-id"});

            // Автоматически отключаем статус "печатает..." через 3 секунды
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
        setMessage('')

    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            sendMessage()
        }
    }
    const messageHandler = (message: ChatMessage) => {
        let chatMes: ChatMessageModel = {
            sender: message.sender,
            receiver: message.receiver,
            text: message.message,
            type: (currentCustomUser.id !== message.senderId) ? "in" : "out",
            time: formatTimeAgo(message.createdAt.toLocaleString())
        };
       addMessage(chatMes);
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

    useEffect(() => {
        if (socket) {
            socket.on('message', messageHandler);
            socket.on('start-typing', startTypingMessageHandler);
            socket.on('stop-typing', stopTypingMessageHandler);
        }
        if(receiver)
        fetchMessages(receiver.id);
        return (() => {
            socket.off('message', messageHandler);
            socket.off('start-typing', startTypingMessageHandler);
            socket.off('stop-typing', stopTypingMessageHandler);
        })

    }, [receiver]);

    return (
        <div
            className='card-body'
            id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}
        >
            <div
                className={clsx('scroll-y me-n5 pe-5', {'min-h-300px max-h-300px h-300px h-lg-auto': !isDrawer})}
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
            >{
                (messages.length > 0) ? messages.map((message, index) => {
                        return (<MessageBlock key={`message-block-${index}`} message={message} isDrawer={isDrawer}/>)
                    }) :
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                        <KTIcon iconName={'message-add'} iconType={'outline'} className='fs-2'/>
                    </div>
            }
                <TypingAnimatedDots isVisible={isTypingVisible}/>
                <div className={'d-none'}></div>
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
