import React, {FC, useEffect, useState} from 'react';
import {CustomUser} from "../../../user-management/custom-users-list/core/custom.user.model.ts";
import {useSocket} from "../../../chat/core/ChatMessageSocketProvider.tsx";
import {Phone, VideoCameraFront} from "@mui/icons-material";
import VideoChatModal from "../../../chat/components/VideoChatModal.tsx";
import {useVideoSocket} from "../../../chat/core/VideoChatSocketProvider.tsx";
import IncomeCallModal from "../../../chat/components/IncomeCallModal.tsx";
import {useVideoChatPeerConnection} from "../../../chat/core/VideoChatPeerConnectionProvider.tsx";
import {SimpleSender} from "../../../chat/core/_chat.model.ts";

type Props = {
    receiver: CustomUser
}


const ChatHeader: FC<Props> = ({receiver}) => {
    const {socket} = useVideoSocket();
    const {peerConnection} = useVideoChatPeerConnection();
    const [isOpenedWithCamera, setIsOpenedWithCamera] = useState<boolean>(false);
    const [offer,setOffer] =useState<RTCSessionDescriptionInit>(null);
    const [simpleSender,setSimpleSender] = useState<SimpleSender>(null);
    const [clientsPair,setClientsPair] =useState(null);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const {onlineUserIds} = useSocket();
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [isIncomingModalOpened,setIsIncomingModalOpened] = useState<boolean>(false);

    useEffect(() => {
        socket.on('incoming-call', ({clientsPair,simpleUser, offer}) => {
            console.log('income-call',offer);
            setIsIncomingModalOpened(true);
            setOffer(offer);
            setSimpleSender(simpleUser);
            setClientsPair(clientsPair);
        });

        setIsOnline(onlineUserIds.includes(receiver.id));
    }, [receiver]);


    return (
        <div className='card-header' id='kt_chat_messenger_header'>
            {
                isOpened && <VideoChatModal isOpened={isOpened}
                                            isOpenedWithCamera={isOpenedWithCamera}
                                            setIsOpened={setIsOpened}
                                            receiver={receiver}/>

            }
            {
                isIncomingModalOpened && <IncomeCallModal isOpened={isIncomingModalOpened}
                                                          setIsOpened={setIsIncomingModalOpened}
                                                          user={simpleSender}
                                                          offer={offer}
                                                          clientsPair={clientsPair}
                />
            }

            <div className='card-title w-100  d-flex justify-content-between'>
                <div className='d-flex justify-content-center flex-column me-3'>
                    <a
                        href='#'
                        className='fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1'
                    >
                        {`${receiver.surname} ${receiver.name}`}
                    </a>

                    {
                        isOnline && <div className='mb-0 lh-1'>
                            <span className='badge badge-success badge-circle w-10px h-10px me-1'></span>
                            <span className='fs-7 fw-bold text-gray-500'>Active</span>
                        </div>
                    }
                </div>
                {
                    // isOnline &&  //todo open
                    <div>
                        <VideoCameraFront onClick={() => {
                            setIsOpenedWithCamera(true);
                            setIsOpened(true);
                        }}
                                          className={'text-primary-emphasis fs-1 fa-bold me-3 cursor-pointer'}/>
                        <Phone onClick={() => {
                            setIsOpenedWithCamera(false);
                            setIsOpened(true)
                        }}
                               className={'text-primary fs-1 fa-bold cursor-pointer'}/>
                    </div>
                }


            </div>

        </div>
    );
};

export default ChatHeader;