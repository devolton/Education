import {FC, useEffect, useMemo, useState} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import {ChatInner} from '../../../../../_metronic/partials'
import {ToolbarWrapper} from '../../../../../_metronic/layout/components/toolbar'
import {Content} from '../../../../../_metronic/layout/components/content'
import OneUserChat from "../../common/components/chat/OneUserChat.tsx";
import ChatHeader from "../../common/components/chat/ChatHeader.tsx";
import {useAuth} from "../../../auth";
import {getCustomUsersWithMessages} from "../../user-management/custom-users-list/core/_userRequests.ts";
import {CustomUser} from "../../user-management/custom-users-list/core/custom.user.model.ts";
import {ChatMessageSocketProvider} from "../core/ChatMessageSocketProvider.tsx";
import {ChatMessagesProvider} from "../core/ChatMessagesProvider.tsx";
import {ChatTileState, initialChatTileState} from "../core/_chat.model.ts";
import {isEmptyArray} from "formik";

const Private: FC = () => {
    const {currentCustomUser} = useAuth();
    const [data, setData] = useState<Array<CustomUser>>([]);
    const [receiver, setReceiver] = useState<CustomUser>(null);
    const users = useMemo(() => data, [data]);
    const [chatTileCollection, setChatTileCollection] = useState<Array<ChatTileState>>([]);
    const [search, setSearch] = useState<string>('')


    const init = () => {

        getCustomUsersWithMessages(currentCustomUser.id, search)
            .then((data: Array<CustomUser>) => {
                if (data) {
                    let sortedUsers: Array<CustomUser> = data.sort((first, second) => {
                        if (first.receivedMessages.length === 0)
                            return 1;
                        if (second.receivedMessages.length === 0)
                            return -1;
                        return (first.receivedMessages[0].createdAt > second.receivedMessages[0].createdAt) ? -1 : 1;
                    })
                    if (sortedUsers.length > 0)
                        setReceiver(sortedUsers[0]);
                    let tempChatColl: Array<ChatTileState> = [];
                    sortedUsers.map((user) => {
                        let chatState: ChatTileState = {...initialChatTileState, chatUserId: user.id};
                        if (!isEmptyArray(user.receivedMessages) && !isEmptyArray(user.sentMessages)) {
                            let isSentMessageLast = user.receivedMessages[0].createdAt > user.sentMessages[0].createdAt;
                            if (isSentMessageLast) {
                                if (user.receivedMessages[0].isRead) {
                                    chatState.isReadMessageIconVisible = true;
                                } else {
                                    chatState.isSendMessageIconVisible = true;
                                }
                            }
                        } else if (!isEmptyArray(user.receivedMessages)) {
                            if (user.receivedMessages[0].isRead) {
                                chatState.isReadMessageIconVisible = true;
                            } else {
                                chatState.isSendMessageIconVisible = true;
                            }
                        }
                        tempChatColl.push(chatState)
                    })
                    setChatTileCollection(tempChatColl);
                    setData(sortedUsers);

                }
            })
            .catch(e => {
                console.log(e);
            });
    }


    useEffect(() => {
        init();
    }, [search])

    const onClickChatHandler = (user: CustomUser) => {
        setReceiver(user);
    }
    return (
        <>
            <ToolbarWrapper/>
            <Content>
                <div className='d-flex flex-column flex-lg-row'>
                    <div className='flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0'>
                        <div className='card card-flush'>
                            <div className='card-header pt-7' id='kt_chat_contacts_header'>
                                <form className='w-100 position-relative' autoComplete='off'>
                                    <KTIcon
                                        iconName='magnifier'
                                        className='fs-2 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y'
                                    />
                                    <input
                                        type='text'
                                        className='form-control form-control-solid px-15'
                                        name='search'
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                        }}
                                        placeholder='Search by full name...'
                                    />
                                </form>
                            </div>

                            <div className='card-body pt-5' id='kt_chat_contacts_body'>
                                <div
                                    className='scroll-y me-n5 pe-5 h-200px h-lg-auto'
                                    data-kt-scroll='true'
                                    data-kt-scroll-activate='{default: false, lg: true}'
                                    data-kt-scroll-max-height='auto'
                                    data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
                                    data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
                                    data-kt-scroll-offset='0px'
                                >
                                    {
                                        chatTileCollection.length > 0 && users.length > 0 && users.map((oneUser, index) => {
                                            return oneUser.id !== currentCustomUser.id &&
                                                <OneUserChat key={`user-chat-${index}`}
                                                             user={oneUser}
                                                             chatTileState={chatTileCollection[index]}
                                                             isActive={oneUser.id === receiver.id}
                                                             onClickHandler={onClickChatHandler}/>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
                        <div className='card' id='kt_chat_messenger'>
                            {receiver !== null && receiver !== undefined && <ChatHeader receiver={receiver}/>}
                            {receiver !== null && receiver !== undefined && <ChatInner receiver={receiver}/>}
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
}


const PrivateWrapper = () => {

    return (
        <ChatMessageSocketProvider>
            <ChatMessagesProvider>
                <Private/>
            </ChatMessagesProvider>
        </ChatMessageSocketProvider>
    )
}

export {PrivateWrapper}
