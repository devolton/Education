import React, {FC, useEffect, useState} from 'react';
import {toDevoltonAbsoluteUrl} from "../../../../../../_metronic/helpers";
import {CustomUser} from "../../../user-management/custom-users-list/core/custom.user.model.ts";
import {useSocket} from "../../../chat/core/ChatMessageSocketProvider.tsx";
import {useLastMessageTime, useMessages, useUnreadMessagesCount} from "../../../chat/core/ChatMessagesProvider.tsx";
import {ChatMessage, ChatTileState} from "../../../chat/core/_chat.model.ts";


type Props = {
    user: CustomUser,
    chatTileState: ChatTileState,
    isActive: boolean,
    onClickHandler: (user: CustomUser) => void
}
const OneUserChat: FC<Props> =React.memo(({user,chatTileState,isActive, onClickHandler}) => {
    const {socket,onlineUserIds} = useSocket();
    const {messages} = useMessages();
    const {unreadMessagesCount,refreshUnreadMessagesCount} = useUnreadMessagesCount(user.id);
    const lastMessageTime = useLastMessageTime(user.id);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [isSendMessages,setIsSendMessages] = useState<boolean>(chatTileState.isSendMessageIconVisible);
    const [isReadMessages,setIsReadMessages] = useState<boolean>(chatTileState.isReadMessageIconVisible);
    const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0);

    useEffect(() => {
        if(socket){
            socket.on('set-read-message',(messageId:number,senderId:number,receiverId:number)=>{
                if(user.id==senderId){
                    chatTileState.isSendMessageIconVisible=false;
                    chatTileState.isReadMessageIconVisible=true;
                    setIsReadMessages(chatTileState.isReadMessageIconVisible);
                    setIsSendMessages(chatTileState.isSendMessageIconVisible);
                }

                refreshUnreadMessagesCount();
            });
            socket.on('set-sent-message',(message:ChatMessage)=>{
                if(user.id==message.receiverId){
                    chatTileState.isSendMessageIconVisible=true;
                    chatTileState.isReadMessageIconVisible=false;
                    setIsReadMessages(chatTileState.isReadMessageIconVisible);
                    setIsSendMessages(chatTileState.isSendMessageIconVisible);

                }

            })
        }
        setUnreadMessageCount(unreadMessagesCount);
        setIsOnline(onlineUserIds.includes(user.id));
        return (()=>{
            socket.off('set-read-message');
            socket.off('set-sent-message');
        })
    }, [onlineUserIds,messages,unreadMessagesCount]);


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
                        isReadMessages && <span className=' fs-7 mb-1'><i
                            className="ki-duotone ki-check fs-4 text-primary-emphasis"></i></span>
                    }
                    {
                       isSendMessages &&
                        <span className="ki-duotone ki-send"><span className="text-primary path1"></span><span
                            className="path2 text-primary-emphasis"></span></span>
                    }

                    {
                        (unreadMessageCount > 0) &&
                        <span
                            className='badge badge-sm badge-circle badge-light-primary'>{unreadMessageCount}</span>
                    }
                </div>
            </div>

            <div className='separator separator-dashed d-none'></div>

        </div>
    );
});

export default OneUserChat;