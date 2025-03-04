import React, {useState, useEffect, useRef} from "react";
import {toDevoltonAbsoluteUrl} from "../../../../_metronic/helpers";
import {Config} from "../../../../env.config.ts";
import {useAuth} from "../../auth";
import io from "socket.io-client";
import Socket = SocketIOClient.Socket;


const VideoChat = () => {
    const {currentCustomUser} = useAuth();
    const [remoteVideoStream, setRemoteVideoStream] = useState(null);
    const [stream, setStream] = useState(null);
    const [videoStream, setVideoStream] = useState(null);
    const [videoEnabled, setVideoEnabled] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const socket = useRef(null);
    const [peerConnection, setPeerConnection] = useState(null);


    useEffect(() => {
        if (audioEnabled) {
            startStream();
        }
        if (videoEnabled)
            startVideoStream();
        return () => {
            stopStream();
            stopVideoStream();
        }
    }, [videoEnabled, audioEnabled]);
    useEffect(() => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        setPeerConnection(pc);
        pc.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.current.emit("ice-candidate", event.candidate);
            }
        };
        const sock = io.connect(Config.PATH.SERVER.VIDEO_CHAT_GATEWAY_URL, {
            query: {userId: currentCustomUser.id},
        });
        socket.current= sock;

        socket?.current.on("offer", async (offer) => {
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socket?.current.emit("answer", answer);
        });

        socket?.current.on("answer", async (answer) => {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket?.current.on("ice-candidate", async (candidate) => {
            try {
                await pc.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
                console.error("Ошибка ICE:", e);
            }
        });
        return () => {
            socket?.current.off("offer");
            socket?.current.off("answer");
            socket?.current.off("ice-candidate");
            socket?.current.disconnect();
        }
    }, []);
    const callUser = async () => {
        if (!peerConnection) return;
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket?.current.emit("offer", offer);
    };

    const startStream = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
            setStream(mediaStream);
            if (audioRef.current) audioRef.current.srcObject = mediaStream;
        } catch (error) {
            console.error("Access camera error...", error);
        }
    };
    const startVideoStream = async () => {
        try {
            const videoStream = await navigator.mediaDevices.getUserMedia({video: true});
            setVideoStream(videoStream);
            if (videoRef.current) videoRef.current.srcObject = videoStream;
            socket?.current.emit("stream", videoStream);

        } catch (error) {
            console.error("Access camera error...", error);
        }
    }
    const stopVideoStream = () => {
        if (!videoStream) return;
        videoStream.getVideoTracks().forEach(track => track.stop());
        setVideoStream(null);
        if (videoRef.current) videoRef.current.srcObject = null;
    };

    const stopStream = () => {
        if (!stream) return;
        stream.getAudioTracks().forEach(track => track.stop());
        setStream(null);
        if (audioRef.current) audioRef.current.srcObject = null;
    };

    const toggleVideo = async () => {
        if (videoEnabled) {
            stopVideoStream();
        } else {
            await startVideoStream();
        }
        setVideoEnabled(!videoEnabled);
    };

    const toggleAudio = async () => {
        if (audioEnabled) {
            stopStream();
        } else {
            await startStream();
        }
        setAudioEnabled(!audioEnabled);
    };

    return (
        <div style={{position: "relative", width: "250px", height: "180px"}}>
            {videoStream && videoEnabled ? (
                <video ref={videoRef} autoPlay playsInline
                       style={{width: "100%", height: "100%", objectFit: "contain"}}
                       className={'shadow-sm rounded-4 ms-4 '}/>
            ) : (
                <img
                    src={toDevoltonAbsoluteUrl(currentCustomUser.avatarPath)}
                    className={'shadow-sm rounded-4 ms-4 '}
                    alt="Камера выключена"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            )}
            {
                audioEnabled && (<audio ref={audioRef} autoPlay/>)
            }

            <div style={{marginTop: "10px"}} className={'d-flex justify-content-around align-items-center'}>
                <img
                    src={toDevoltonAbsoluteUrl((videoEnabled) ? Config.PATH.ASSETS.CAMERA.CAMERA_OFF : Config.PATH.ASSETS.CAMERA.CAMERA_ON)}
                    style={{width: "50px"}}
                    className={'border-2 cursor-pointer'}
                    alt={'camera'}
                    onClick={toggleVideo}
                />


                <img
                    src={toDevoltonAbsoluteUrl((audioEnabled) ? Config.PATH.ASSETS.CAMERA.MICROPHONE_OFF : Config.PATH.ASSETS.CAMERA.MICROPHONE_ON)}
                    style={{width: "50px"}}
                    className={'border-2 cursor-pointer'}
                    alt={'microphone'}
                    onClick={toggleAudio}
                />

            </div>
            <video ref={remoteVideoRef} autoPlay playsInline
                   className={'bg-primary'}
                   style={{width: "100%", height: "100%", objectFit: "contain"}}/>
            <button onClick={callUser}>Позвонить</button>
        </div>
    );
};

export default VideoChat;
