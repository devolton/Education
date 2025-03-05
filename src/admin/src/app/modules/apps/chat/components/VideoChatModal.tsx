import React, {useEffect, useRef, useState} from 'react';
import {Fade, Modal} from "@mui/material";
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import VideoCamIcon from '@mui/icons-material/VideoCam'
import VideoCamOffIcon from '@mui/icons-material/VideoCamOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import {CustomUser} from "../../user-management/custom-users-list/core/custom.user.model.ts";
import {toDevoltonAbsoluteUrl} from "../../../../../_metronic/helpers";

type Props = {
    isOpened: boolean;
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
    receiver: CustomUser

}

const VideoChatModal = ({isOpened, setIsOpened, receiver}) => {
    const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
    const [isMicOn, setIsMicOn] = useState<boolean>(false);
    const [isVideo, setIsVideo] = useState<boolean>(false);
    const localVideoRef = useRef(null);
    const [stream, setStream] = useState(null);
    useEffect(() => {
        if (isVideo){
            navigator.mediaDevices.getUserMedia({video: true, audio:false})
                .then((stream) => {
                    setStream(stream);
                    localVideoRef.current.srcObject =stream;

                });

        }
    },[]);

    const start =()=>{
            navigator.mediaDevices.getUserMedia({video: true, audio:false})
                .then((stream) => {
                    setStream(stream);
                    localVideoRef.current.srcObject =stream;

                });


    }



    return (
        <Modal open={isOpened}
               onClick={() => {
                   setIsOpened(false)
               }}
               onClose={(e) => {
               }} className={'d-flex justify-content-center align-items-center shadow-lg'}>
            <Fade in={isOpened}>
                <div
                    className='modal-content bg-white w-50 h-75 d-flex justify-content-center align-items-center rounded-4 position-relative'
                    onClick={(e) => {
                        e.stopPropagation()
                    }}>
                    <div
                        className={"w-100 h-100 d-flex align-items-center justify-content-center rounded-4 bg-black "}>
                        {(isVideo) ?
                            <video ref={localVideoRef}
                                   autoPlay
                                   playsInline
                                   className={'w-100 h-100 object-fit-cover rounded-4 mw-100 mh-100'}/>
                            :
                            <img src={toDevoltonAbsoluteUrl(receiver.avatarPath)}
                                 className={'object-fit-cover mw-50 mh-50 rounded-4'}
                                 alt={'camera'}/>
                        }
                    </div>

                        <img src={toDevoltonAbsoluteUrl(receiver.avatarPath)}
                             className={'object-fit-cover mw-25 mh-25 rounded-4 position-absolute bottom-0 right-100'}
                             alt={'camera'}/>


                    <div
                        className={'w-25 d-flex justify-content-between align-items-center bd-warning rounded-4 position-absolute bottom-0 left-0 p-2'}>
                        {
                            (isMicOn) ? (<MicOffIcon fontSize={'large'}
                                                     onClick={() => {
                                                         setIsMicOn(false)
                                                     }}
                                                     style={{fontSize: "36px"}}
                                                     className={'bg-light shadow-lg  hover-scale cursor-pointer rounded-4 p-2'}
                                                     color={'primary'}/>)
                                :
                                (<MicIcon fontSize={'large'}
                                          onClick={() => {
                                              setIsMicOn(true)
                                          }}
                                          style={{fontSize: "36px"}}
                                          className={'bg-light shadow-lg hover-scale cursor-pointer rounded-4 p-2'}
                                          color={'primary'}/>)
                        }
                        {(isCameraOn) ?
                            (<VideoCamIcon fontSize={'large'}
                                           style={{fontSize: "36px"}}
                                           onClick={() => {
                                               setIsVideo(false)
                                               setIsCameraOn(false)
                                           }}
                                           className={'bg-light shadow-lg hover-scale cursor-pointer rounded-4 p-2'}
                                           color={'primary'}/>)
                            :
                            (<VideoCamOffIcon fontSize={'large'}
                                              style={{fontSize: "36px"}}
                                              onClick={() => {
                                                  start();
                                                  setIsVideo(true)
                                                  setIsCameraOn(true)
                                              }}
                                              className={'bg-light shadow-lg hover-scale cursor-pointer rounded-4 p-2'}
                                              color={'primary'}/>)
                        }
                        <CallEndIcon fontSize={'large'}
                                     onClick={() => {
                                         setIsOpened(false)
                                     }}//todo change to close handler
                                     style={{fontSize: "36px"}}
                                     className={'bg-light shadow-lg hover-scale cursor-pointer rounded-4 p-2'}
                                     color={'error'}/>
                    </div>


                </div>
            </Fade>
        </Modal>
    );
};

export default VideoChatModal;