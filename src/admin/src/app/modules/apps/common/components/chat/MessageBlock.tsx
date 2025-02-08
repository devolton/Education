import React from 'react';
import clsx from "clsx";
import ChatReceiverHeader from "./ChatReceiverHeader.tsx";
import ChatSenderHeader from "./ChatSenderHeader.tsx";
import ChatMessage from "./ChatMessage.tsx";

const MessageBlock = ({message,isDrawer}) => {

    const templateAttr = {}
    const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-${
        message.type === 'in' ? 'start' : 'end'
    } mb-10`
    return (
        <div
            message-id={message.id}
            className={clsx('d-flex', contentClass, 'mb-10')}
            {...templateAttr}
        >
            <div
                className={clsx(
                    'd-flex flex-column align-items',
                    `align-items-${message.type === 'in' ? 'start' : 'end'}`
                )}
            >
                {/*sender header block*/}
                <div className='d-flex align-items-center mb-2'>
                    {message.type === 'in' ? (
                        <ChatReceiverHeader message={message}/>
                    ) : (
                        <ChatSenderHeader message={message}/>
                    )}
                </div>
                {/*text messages block*/}
                <ChatMessage message={message}/>
            </div>
        </div>
    )
};

export default MessageBlock;