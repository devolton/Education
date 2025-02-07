import {FC, useEffect, useRef, useState} from 'react'
import clsx from 'clsx'
import {formatTimeAgo, KTIcon,} from '../../helpers'

import ChatFooter from "../../../app/modules/apps/common/components/chat/ChatFooter.tsx";
import MessageBlock from "../../../app/modules/apps/common/components/chat/MessageBlock.tsx";
import {getUserMessages} from "../../../app/modules/apps/chat/core/_chat.request.ts";
import {CustomUser} from "../../../app/modules/apps/user-management/custom-users-list/core/custom.user.model.ts";
import {useAuth} from "../../../app/modules/auth";
import {ChatMessage, ChatMessageModel} from "../../../app/modules/apps/chat/core/_chat.model.ts";
import {useSocket} from "../../../app/modules/apps/chat/core/ChatMessageSocketProvider.tsx";

type Props = {
    isDrawer?: boolean
    receiver: CustomUser
}


const ChatInner: FC<Props> = ({receiver, isDrawer = false}) => {
    const {socket} = useSocket();
    const {currentCustomUser} = useAuth();
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<Array<ChatMessageModel>>([])


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
        console.log(chatMes)
        setMessages((prev) => [...prev, chatMes]);
    }

    useEffect(() => {
        if (socket) {
            socket.on('message', messageHandler);
        }

        if (receiver)
            getUserMessages(receiver.id).then(data => {
                console.log(data);
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
        return (() => {
            socket.off('message', messageHandler);
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
            <div className={'d-flex p-2 fa-bold text-primary-emphasis'}><FontAwesomeIcon icon="fa-light fa-circle" style={{color: "#000000",}} /></div>
            </div>
            {/*input message block*/}
            <div
                className='card-footer pt-4'
                id={isDrawer ? 'kt_drawer_chat_messenger_footer' : 'kt_chat_messenger_footer'}
            >
        <textarea
            className='form-control form-control-flush mb-3'
            rows={1}
            data-kt-element='input'
            placeholder='Type a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onEnterPress}
        ></textarea>

                <ChatFooter sendMessageHandler={sendMessage}/>
            </div>
        </div>
    )
}

export {ChatInner}
