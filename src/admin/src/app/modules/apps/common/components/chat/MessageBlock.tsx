import React, {FC, forwardRef} from 'react';
import clsx from "clsx";
import ChatReceiverHeader from "./ChatReceiverHeader.tsx";
import ChatSenderHeader from "./ChatSenderHeader.tsx";
import {ChatMessageModel} from "../../../chat/core/_chat.model.ts";
import ChatMessage from "./ChatMessage.tsx";

type Props = {

    message: ChatMessageModel,
    isNewMessagesBlockVisible: boolean,
    isDrawer?: boolean,
}

const MessageBlock = forwardRef<HTMLDivElement, Props>(({message,isNewMessagesBlockVisible, isDrawer}, ref) => {

        const templateAttr = {}
        const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-${
            message.type === 'in' ? 'start' : 'end'
        } mb-10`
        return (
            <>
            {
                isNewMessagesBlockVisible && <div className={'d-flex align-items-center fw-semibold justify-content-center text-center bg-info-subtle p-1 m-1 border-1'}>new messages</div>
            }
                <div
                    ref={ref}
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
            </>
        )
    }
);

export default MessageBlock;