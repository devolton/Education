import React, {FC, useEffect, useState} from 'react';
import {toDevoltonAbsoluteUrl} from "../../../../../../_metronic/helpers";
import {CustomUser} from "../../../user-management/custom-users-list/core/custom.user.model.ts";
import {useSocket} from "../../../chat/core/ChatMessageSocketProvider.tsx";
import {useLastMessageTime, useMessages, useUnreadMessagesCount} from "../../../chat/core/ChatMessagesProvider.tsx";
import {isEmptyArray} from "formik";

type Props = {
    user: CustomUser,
    isActive: boolean,
    onClickHandler: (user: CustomUser) => void
}
const OneUserChat: FC<Props> = ({user,isActive, onClickHandler}) => {
    const {onlineUserIds} = useSocket();
    const unreadMessagesCount = useUnreadMessagesCount(user.id);
    const lastMessageTime = useLastMessageTime(user.id);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [isSendMessageIconVisible, setIsSendMessageIconVisible] = useState<boolean>(false);
    const [isReadMessageIconVisible, setIsReadMessageIconVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!isEmptyArray(user.receivedMessages) && !isEmptyArray(user.sentMessages)) {
            let isSentMessageLast = user.receivedMessages[0].createdAt >user.sentMessages[0].createdAt;
            if(isSentMessageLast) {
                if (user.receivedMessages[0].isRead) {
                    setIsReadMessageIconVisible(true);
                } else {
                    setIsSendMessageIconVisible(true);
                }
            }
        }
        else if(!isEmptyArray(user.receivedMessages)){
            if (user.receivedMessages[0].isRead) {
                setIsReadMessageIconVisible(true);
            } else {
                setIsSendMessageIconVisible(true);
            }
        }

        setIsOnline(onlineUserIds.includes(user.id));
    }, [onlineUserIds]);


    return (
        <div>
            <div onClick={() => {
                onClickHandler(user)
            }} className={`p-1 rounded-2 cursor-pointer d-flex flex-stack py-4 ${isActive?'bg-light-primary':''}`}>
                <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px symbol-circle'>
                        <img alt='Pic' src={toDevoltonAbsoluteUrl(user.avatarPath)}/>
                        {
                            isOnline && <div
                                className='symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n2 mt-n2'></div>
                        }
                    </div>

                    <div className='ms-5'>
                        <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                            {`${user.surname} ${user.name}`}
                        </a>
                        <div className='fw-bold text-gray-500'>{user.login}</div>
                    </div>
                </div>

                <div className='d-flex flex-column align-items-end ms-2'>
                    <span className='text-muted fs-7 mb-1'>{lastMessageTime}</span>
                    {
                        isReadMessageIconVisible && <span className=' fs-7 mb-1'><i
                            className="ki-duotone ki-check text-primary-emphasis"></i></span>
                    }
                    {
                        isSendMessageIconVisible &&
                        <span className="ki-duotone ki-send"><span className="text-primary path1"></span><span
                            className="path2 text-primary-emphasis"></span></span>
                    }

                    {
                        (unreadMessagesCount > 0) &&
                        <span
                            className='badge badge-sm badge-circle badge-light-primary'>{unreadMessagesCount}</span>
                    }
                </div>
            </div>

            <div className='separator separator-dashed d-none'></div>

        </div>
    );
};

export default OneUserChat;