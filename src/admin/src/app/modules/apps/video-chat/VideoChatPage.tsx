import React, {useRef, useEffect, useState} from 'react';
import io, {connect} from 'socket.io-client';
import {Config} from "../../../../env.config.ts";
import {useAuth} from "../../auth";

// Подключаемся к серверу

const VideoChatPage = () => {
    const {currentCustomUser} = useAuth();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const [isCalling, setIsCalling] = useState(false);
    const streamRef = useRef(null);
    const [mediaStream, setMediaStream] = useState<MediaStream>(null);
    const socket = connect(Config.PATH.SERVER.VIDEO_CHAT_GATEWAY_URL, {
        query: {userId: currentCustomUser.id},
    });

    useEffect(() => {

        peerConnection.current = new RTCPeerConnection({
            iceServers: [{urls: 'stun:stun.l.google.com:19302'}]
        });
        navigator.mediaDevices.getUserMedia({video: (currentCustomUser.id === 3), audio: (currentCustomUser.id === 55)})
            .then((stream) => {
                streamRef.current=stream;
                localVideoRef.current.srcObject = streamRef.current;
                // Добавляем локальные потоки в WebRTC
                streamRef.current.getTracks().forEach(track => peerConnection.current.addTrack(track, streamRef.current));

                // Обрабатываем входящие ICE-кандидаты
                peerConnection.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('ice-candidate', {candidate: event.candidate, to: 55});
                    }
                };

                // Принимаем удаленный поток
                peerConnection.current.ontrack = (event) => {
                    console.log("Ontrack ");
                    console.log(event);
                    remoteVideoRef.current.srcObject = event.streams[0];
                };
            });

        // Обрабатываем входящий звонок
        socket.on('incoming-call', async ({from, offer}) => {
            console.log('incoming call');
            console.log('offer', offer);
            setIsCalling(true);
            peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            socket.emit('answer-call', {to: from, answer});
        });

        // Обрабатываем ответ на звонок
        socket.on('call-answered', ({answer}) => {
            console.log('call-answered');
            peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
            console.log(answer);
        });

        // Обрабатываем ICE-кандидатов
        socket.on('ice-candidate', ({candidate}) => {
            console.log('ice candidate', candidate);
            peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        });
        return () => {
            peerConnection.current.close();
            socket.disconnect();
        }

    }, []);
    const startVideoStream = async () => {
        try {
            const videoStream = await navigator.mediaDevices.getUserMedia({video: true});
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = videoStream;

        } catch (error) {
            console.error("Access camera error...", error);
        }
    }
    const stopStream = () => {
        if (!streamRef.current) return;
        streamRef.current.getVideoTracks().forEach(track => track.stop());
        setMediaStream(null);
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    };

    // Функция для звонка
    const callUser = async () => {
        console.log("Calling user...");
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit('call-user', {to: 55, offer});
    };

    return (
        <div>
            <h2>WebRTC Video Chat</h2>
            <video ref={localVideoRef} autoPlay playsInline muted/>
            <video ref={remoteVideoRef} autoPlay playsInline/>
            {!isCalling ? <button onClick={callUser}>Call</button> : <p>Calling...</p>}
            <button onClick={stopStream}>Stop</button>
            <button onClick={startVideoStream}>Start</button>
        </div>
    );
};

export default VideoChatPage;
