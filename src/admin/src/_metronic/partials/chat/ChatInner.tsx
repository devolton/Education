import {FC, useState} from 'react'
import clsx from 'clsx'
import {defaultMessages, messageFromClient, MessageModel,} from '../../helpers'

import ChatFooter from "../../../app/modules/apps/common/components/chat/ChatFooter.tsx";
import MessageBlock from "../../../app/modules/apps/common/components/chat/MessageBlock.tsx";

type Props = {
    isDrawer?: boolean
}

const bufferMessages = defaultMessages

const ChatInner: FC<Props> = ({isDrawer = false}) => {
    const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<MessageModel[]>(bufferMessages)

    const sendMessage = () => {
        const newMessage: MessageModel = {
            user: 2,
            type: 'out',
            text: message,
            time: 'Just now',
        }

        bufferMessages.push(newMessage)
        setMessages(bufferMessages)
        toggleChatUpdateFlat(!chatUpdateFlag)
        setMessage('')
        setTimeout(() => {
            bufferMessages.push(messageFromClient)
            setMessages(() => bufferMessages)
            toggleChatUpdateFlat((flag) => !flag)
        }, 1000)
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <div
            className='card-body'
            id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}
        >
            <div
                className={clsx('scroll-y me-n5 pe-5', {'h-300px h-lg-auto': !isDrawer})}
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
                {messages.map((message, index) => {
                    return (<MessageBlock key={`message-block-${index}`} message={message} isDrawer={isDrawer}/> )
                })}
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
