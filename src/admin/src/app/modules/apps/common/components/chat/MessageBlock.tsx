import React, {useState} from 'react';
import clsx from "clsx";
import ChatReceiverHeader from "./ChatReceiverHeader.tsx";
import ChatSenderHeader from "./ChatSenderHeader.tsx";
import ChatMessage from "./ChatMessage.tsx";
import {defaultUserInfos, UserInfoModel} from "../../../../../../_metronic/helpers";

const MessageBlock = ({message,isDrawer}) => {
    const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos)
    const userInfo = userInfos[message.user]
    const templateAttr = {}
    const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-${
        message.type === 'in' ? 'start' : 'end'
    } mb-10`
    return (
        <div
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
                        <ChatReceiverHeader message={message}
                                            userInfo={userInfo}/>
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