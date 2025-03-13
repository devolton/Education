import React, {FC, useEffect} from 'react';
import {Fade, Modal} from "@mui/material";
import {motion} from "framer-motion";
import {CallEnd} from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import {toDevoltonAbsoluteUrl} from "../../../../../_metronic/helpers";
import {ClientIdPair, IncomeCallAnswerResponse, IncomeCallAnswerStatus, SimpleSender} from "../core/_chat.model.ts";
import {useVideoChatPeerConnection} from "../core/VideoChatPeerConnectionProvider.tsx";
import {useVideoSocket} from "../core/VideoChatSocketProvider.tsx";

type Props = {
    isOpened: boolean;
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
    user: SimpleSender,
    offer?: RTCSessionDescriptionInit,
    clientsPair: ClientIdPair
}

const IncomeCallModal: FC<Props> = ({isOpened, setIsOpened, user, offer, clientsPair}) => {
    const {peerConnection} = useVideoChatPeerConnection();
    const {socket} = useVideoSocket();
    useEffect(() => {
       let timeout =  setTimeout(async () => {
                await sendAnswer("missed");

        }, 10000)
        return (()=>{
            clearTimeout(timeout);
        })
    }, []);


    const sendAnswer = async (answerStatus: IncomeCallAnswerStatus) => {

        let answer: RTCSessionDescriptionInit = null;
        if (answerStatus === "answered") {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
        }

        const clientIds = {
            receiverId: clientsPair.senderId,
            senderId: clientsPair.receiverId
        }
        const payload: IncomeCallAnswerResponse = {
            clientsIdPair: clientIds,
            incomeCallAnswerStatus: answerStatus,
            answer: answer
        };
        socket.emit('answer-call', payload);
        setIsOpened(false);
        if (answerStatus === "answered") {
            //todo open video chat modal
        }
    }


    return (
        <Modal open={isOpened}

               onClick={() => {
                   setIsOpened(false)
               }}
               onClose={() => {
               }} className={'d-flex justify-content-center align-items-center shadow-lg'}>
            <Fade in={isOpened}>
                <motion.div
                    animate={{scale: [1, 1.2, 1]}}
                    transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                    className='modal-content bg-white w-25 h-25 d-flex justify-content-center align-items-center rounded-4 position-relative'
                    onClick={(e) => {
                        e.stopPropagation()
                    }}>
                    <div
                        className={'d-flex flex-column justify-content-around align-items-center mw-75 mh-75 mt-2'}>
                        <img src={toDevoltonAbsoluteUrl(user.avatarPath)}
                             className={'object-fit-cover mw-75 mh-75 rounded-4 '}
                             alt={'camera'}/>
                        <span className={'fw-bolder'}>{user.login} calling...</span>
                    </div>
                    <div className={'w-75 d-flex justify-content-around align-items-center mb-2'}>
                        <PhoneIcon
                            onClick={async () => {
                                await sendAnswer("answered")
                            }}
                            style={{width: "40px", height: "40px"}}
                            className={'text-success bg-black shadow-lg  hover-scale cursor-pointer rounded-4 p-2'}/>
                        <CallEnd
                            onClick={async () => {
                                await sendAnswer("declined")
                            }}
                            style={{width: "40px", height: "40px"}}
                            className={'text-danger bg-black shadow-lg  hover-scale cursor-pointer rounded-4 p-2'}/>

                    </div>


                </motion.div>
            </Fade>
        </Modal>
    );
};

export default IncomeCallModal;