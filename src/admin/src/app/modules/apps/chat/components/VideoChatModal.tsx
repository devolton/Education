import React, {FC, useEffect, useRef, useState} from 'react';
import {Fade, Modal} from "@mui/material";
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import VideoCamIcon from '@mui/icons-material/VideoCam'
import VideoCamOffIcon from '@mui/icons-material/VideoCamOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import {CustomUser} from "../../user-management/custom-users-list/core/custom.user.model.ts";
import {toDevoltonAbsoluteUrl} from "../../../../../_metronic/helpers";
import {useAuth} from "../../../auth";
import Socket = SocketIOClient.Socket;
import {connect} from "socket.io-client";
import {Config} from "../../../../../env.config.ts";


type Props = {
    isOpened: boolean,
    isOpenedWithCamera: boolean,
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>,
    receiver: CustomUser

}

const VideoChatModal: FC<Props> = ({isOpened, isOpenedWithCamera, setIsOpened, receiver}) => {
    const socketRef = useRef<Socket | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection>(null);
    const {currentCustomUser} = useAuth();

    const [isCameraOn, setIsCameraOn] = useState<boolean>(isOpenedWithCamera);
    const [isMicOn, setIsMicOn] = useState<boolean>(false);
    const [isVideo, setIsVideo] = useState<boolean>(isOpenedWithCamera);

    let localVideoStream: MediaStream = null;
    let localAudioStream: MediaStream = null;


    const localVideoRef = useRef(null);
    const localAudioRef = useRef(null);
    useEffect(() => {
        console.log("Video chat use effect!!!")
        if (!socketRef.current)
            socketRef.current = connect(Config.PATH.SERVER.VIDEO_CHAT_GATEWAY_URL);
        if (!peerConnectionRef.current)
            peerConnectionRef.current = new RTCPeerConnection({
                    iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
                }
            )
        if (isVideo) {
            navigator.mediaDevices.getUserMedia({video: true})
                .then((stream) => {
                    localVideoStream = stream;
                    stream.getVideoTracks().forEach(track => peerConnectionRef.current.addTrack(track, localVideoStream));
                    localVideoRef.current.srcObject = stream;

                });

        }
        if (isMicOn) {
            navigator.mediaDevices.getUserMedia({audio: false})
                .then(stream => {
                    localAudioStream = stream;
                    stream.getVideoTracks().forEach(track => peerConnectionRef.current.addTrack(track, localAudioStream));
                })
        }
        peerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('ice-candidate', {candidate: event.candidate, to: receiver.id});
            }
        }
        peerConnectionRef.current.ontrack = (event) => {
            if (event?.track?.kind === "audio") {
                console.log("Remote audio track");
                console.log(event.track);
                localAudioRef.current.srcObject = event.streams[0];
            }
            if (event?.track?.kind === 'video') {
                console.log("Remote video track");
                console.log(event.track);
                localVideoRef.current.srcObject = event.streams[0];
            }
        }
        socketRef.current.on('incoming-call', async ({clientsIdsPair, offer}) => {
            //todo adding modal window to answering the call
            console.log('incoming call');
            console.log('offer', offer);
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            socketRef.current.emit('answer-call', {to: clientsIdsPair.senderId, answer});
        });
        socketRef.current.on('call-answered', async ({answer}) => {
            console.log('call-answered');
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
            console.log(answer);
        });

        callUser();
        return (() => {
            console.log("VIDEO CHAT DESTRUCTOR!")
            socketRef.current?.off('ice-candidate');
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
            socketRef.current.close();
            socketRef.current = null;

        });
    }, []);
    // Функция для звонка
    const callUser = async () => {
        console.log("Calling user...");
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        let clientsObj = {
            receiverId: receiver.id,
            senderId: currentCustomUser.id
        };
        socketRef.current.emit('call-user', {clientsObj, offer});
    };
    const stopVideoStream = () => {
        if (!localVideoRef.current) return;

        localVideoStream?.getVideoTracks().forEach(track => track.stop());
        localVideoStream = null;
        if (localVideoRef.current) localVideoRef.current.srcObject = null;
    };

    const start = () => {
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
            .then((stream: MediaStream) => {
                localVideoStream = stream;
                localVideoRef.current.srcObject = stream;

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
                   localAudioStream=stream;
                })
        } else {
            let audioTrack = localAudioStream?.getAudioTracks()[0];
            if (audioTrack)
                audioTrack.enabled = true;
        }

    }

    const stopMic = () => {
        let audioTrack = localAudioStream?.getAudioTracks()[0];
        if (audioTrack)
            audioTrack.enabled = false;

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
                    <div
                        className={"w-25 h-25 d-flex align-items-center justify-content-center rounded-4 bg-black  position-absolute"}
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
                        <audio ref={localAudioRef} autoPlay></audio>
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
    )
        ;
};

export default VideoChatModal;