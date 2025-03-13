import React, {FC, useEffect, useRef, useState} from 'react';
import {Fade, Modal} from "@mui/material";
import {motion} from "framer-motion";
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import VideoCamIcon from '@mui/icons-material/VideoCam'
import VideoCamOffIcon from '@mui/icons-material/VideoCamOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import {CustomUser} from "../../user-management/custom-users-list/core/custom.user.model.ts";
import {toDevoltonAbsoluteUrl} from "../../../../../_metronic/helpers";
import {useAuth} from "../../../auth";
import {Config} from "../../../../../env.config.ts";
import VideoPlayer from "./VideoPlayer.tsx";
import {useVideoSocket} from "../core/VideoChatSocketProvider.tsx";
import {useVideoChatPeerConnection} from "../core/VideoChatPeerConnectionProvider.tsx";
import {IncomeCallAnswerResponse} from "../core/_chat.model.ts";


type Props = {
    isOpened: boolean,
    isOpenedWithCamera: boolean,
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
    receiver: CustomUser

}

const VideoChatModal: FC<Props> = ({isOpened, isOpenedWithCamera, setIsOpened, receiver}) => {
    const {socket} = useVideoSocket();
    const {peerConnection} = useVideoChatPeerConnection();
    const {currentCustomUser} = useAuth();

    const [isCameraOn, setIsCameraOn] = useState<boolean>(isOpenedWithCamera);
    const [isMicOn, setIsMicOn] = useState<boolean>(true); //todo change
    const [isVideo, setIsVideo] = useState<boolean>(isOpenedWithCamera);
    const [isRemoteVideo, setIsRemoteVideo] = useState<boolean>(false);
    const [isCalling, setIsCalling] = useState<boolean>(false);

    const [localVideoStream, setLocalVideoStream] = useState<MediaStream | null>(null);
    const [localAudioStream, setLocalAudioStream] = useState<MediaStream | null>(null);
    const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream>(null);
    const [remoteAudioStream, setRemoteAudioStream] = useState<MediaStream>(null);


    const localVideoRef = useRef(null);
    const remoteAudioRef = useRef(null);
    useEffect(() => {
        console.log("Video chat use effect!!!")
        if (isVideo) {
            navigator.mediaDevices.getUserMedia({video: true, audio: false})
                .then((stream) => {
                    setLocalVideoStream(stream);
                    stream.getVideoTracks().forEach(track => peerConnection.addTrack(track, stream));
                    localVideoRef.current.srcObject = stream;
                    console.log(peerConnection.getSenders())
                });

        }
        if (isMicOn) {
            navigator.mediaDevices.getUserMedia({video: false, audio: true})
                .then(stream => {
                    setLocalAudioStream(stream);
                    stream.getAudioTracks().forEach(track => peerConnection.addTrack(track, stream));
                    console.log(peerConnection.getSenders())
                })
        }
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', {
                    candidate: event.candidate,
                    to: receiver.id,
                    from: currentCustomUser.id
                });
            }
        }

        peerConnection.ontrack = (event) => {
            console.log(event)
            if (event?.track?.kind === "audio") {
                console.log("Remote audio track");
                console.log(event.track);
                setRemoteAudioStream(event.streams[0])
                remoteAudioRef.current.srcObject = event.streams[0];

            }
            if (event?.track?.kind === 'video') {
                console.log("Remote video track");
                setRemoteVideoStream(event.streams[0]);
                setIsRemoteVideo(true);
            }
        }
        socket.on('call-answered', async (payload: IncomeCallAnswerResponse) => {
            console.log('call-answered');
            setIsCalling(false);
            console.log(payload.answer);
            if (payload.incomeCallAnswerStatus === 'answered')
                await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.answer));
            else
                setIsOpened(false);
        });
        // Обрабатываем ICE-кандидатов
        socket.on('ice-candidate', async ({candidate}) => {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        });
        socket.on('stop-remote-video', ({to, from}) => {
            console.log('stop-remote-video handler');
            console.log(remoteVideoStream)
            remoteVideoStream?.getVideoTracks().forEach(track => track.stop());
            setIsRemoteVideo(false);
            setRemoteVideoStream(null);
            console.log(peerConnection.getReceivers())

        });


        return (() => {
            console.log("VIDEO CHAT DESTRUCTOR!")
            socket?.off('ice-candidate');

        });
    }, []);


    // Функция для звонка
    const callUser = async () => {
        console.log("Calling user...");
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        let clientsObj = {
            receiverId: receiver.id,
            senderId: currentCustomUser.id
        };
        let payload = {
            clients: clientsObj,
            offer: offer
        };
        setIsCalling(true);
        socket.emit('call-user', payload);
    };
    const stopVideoStream = () => {
        peerConnection.getSenders().forEach(sender => {
            if (sender.track?.kind === "video") {

                peerConnection.removeTrack(sender);
                console.log(peerConnection.getSenders());

            }
        });
        if (localVideoRef.current)
            localVideoRef.current.srcObject = null;
        socket.emit('stop-video', {to: receiver.id, from: currentCustomUser.id});
        localVideoStream?.getVideoTracks().forEach(track => track.stop());
        setLocalVideoStream(null);

    };

    const start = () => {
        console.log(peerConnection.getSenders());
        navigator.mediaDevices.getUserMedia({video: true})
            .then((stream: MediaStream) => {
                setLocalVideoStream(stream);
                localVideoRef.current.srcObject = stream;
                stream.getVideoTracks().forEach(track => {
                    peerConnection.addTrack(track, stream);
                });
            });

    }

    const clearStreams = () => {
        setIsCameraOn(false);
        setIsCameraOn(false);
        localVideoStream?.getTracks().forEach((track) => {
            track.stop()
        });
        localAudioStream?.getTracks().forEach((track) => {
            track.stop()
        });
    }
    const startMic = () => {
        if (localAudioStream === null) {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then((stream: MediaStream) => {
                    setLocalAudioStream(stream);
                    stream.getAudioTracks().forEach(track => peerConnection.addTrack(track, stream));
                })
        } else {
            let audioTrack = localAudioStream?.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = true;
            }

        }
        if (currentCustomUser.id === 3) {
            callUser();
        }

    }

    const stopMic = () => {
        let audioTrack = localAudioStream?.getAudioTracks()[0];
        console.log('audioTrack stopped');
        if (audioTrack) {
            audioTrack.enabled = false;
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
                <div
                    className='modal-content bg-white w-50 h-75 d-flex justify-content-center align-items-center rounded-4 position-relative'
                    onClick={(e) => {
                        e.stopPropagation()
                    }}>
                    <div
                        className={"w-100 h-100 d-flex align-items-center justify-content-center rounded-4 bg-black "}>
                        {
                            (isCalling) ?
                                <motion.img src={toDevoltonAbsoluteUrl(Config.PATH.ASSETS.CAMERA.CALLING_ICON)}
                                            animate={{scale: [1, 1.2, 1]}}
                                            transition={{duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
                                            className={'object-fit-cover mw-25 mw-25 rounded-4 bg-transparent'}
                                            alt={'calling'}/>


                                :

                                ((isRemoteVideo)
                                        ?
                                        <VideoPlayer stream={remoteVideoStream}
                                                     classes={'w-100 h-100 object-fit-cover rounded-4 mw-100 mh-100'}/>
                                        :
                                        <img src={toDevoltonAbsoluteUrl(receiver.avatarPath)}
                                             className={'object-fit-cover mw-50 mh-50 rounded-4'}
                                             alt={'camera'}/>
                                )
                        }
                    </div>
                    <div
                        className={"w-25 h-25 d-flex align-items-center justify-content-center rounded-4 position-absolute bg-transparent"}
                        style={{right: "10px", bottom: "10px"}}>
                        {

                            (isVideo) ?
                                <video ref={localVideoRef}
                                       autoPlay
                                       playsInline
                                       className={'w-100 h-100 object-fit-cover rounded-4 mw-100 mh-100'}/>
                                :
                                <img src={toDevoltonAbsoluteUrl(currentCustomUser.avatarPath)}
                                     className={'object-fit-cover mw-100 mh-100 rounded-4 '}
                                     alt={'camera'}/>

                        }
                        <audio ref={remoteAudioRef} autoPlay></audio>
                    </div>

                    <div
                        className={'w-25 d-flex justify-content-between align-items-center bd-warning rounded-4 position-absolute bottom-0 left-0 p-2'}>
                        {
                            (isMicOn) ?
                                (<MicIcon fontSize={'large'}
                                          onClick={() => {
                                              setIsMicOn(false);
                                              stopMic();
                                          }}
                                          style={{fontSize: "36px"}}
                                          className={'bg-light shadow-lg hover-scale cursor-pointer rounded-4 p-2'}
                                          color={'primary'}/>)
                                :
                                (<MicOffIcon fontSize={'large'}
                                             onClick={() => {
                                                 setIsMicOn(true)
                                                 startMic();
                                             }}
                                             style={{fontSize: "36px"}}
                                             className={'bg-light shadow-lg  hover-scale cursor-pointer rounded-4 p-2'}
                                             color={'primary'}/>)

                        }
                        {(isCameraOn) ?
                            (<VideoCamIcon fontSize={'large'}
                                           style={{fontSize: "36px"}}
                                           onClick={() => {
                                               stopVideoStream();
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
                                         clearStreams();
                                         setIsOpened(false);
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