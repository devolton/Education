import {useState, useEffect, useRef} from "react";
import {toDevoltonAbsoluteUrl} from "../../../../_metronic/helpers";
import {Config} from "../../../../env.config.ts";


const VideoChat = () => {
    const [stream, setStream] = useState(null);
    const [videoStream, setVideoStream] = useState(null);
    const [videoEnabled, setVideoEnabled] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioEnabled) {
            startStream();
        }
        if(videoEnabled)
            startVideoStream();
        return () =>{
            stopStream();
            stopVideoStream();
        }
    }, [videoEnabled,audioEnabled]);

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
        }
        catch (error) {
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
        if(audioRef.current) audioRef.current.srcObject=null;
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
        <div style={{position: "relative", width: "300px", height: "200px"}}>
            {videoStream && videoEnabled ? (
                <video ref={videoRef} autoPlay playsInline style={{width: "100%", height: "100%"}}/>
            ) : (
                <img
                    src={toDevoltonAbsoluteUrl(Config.PATH.ASSETS.CAMERA.DISABLE_CAMERA_ICON)}
                    alt="Камера выключена"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "black",
                    }}
                />
            )}
            {
                audioEnabled && (<audio ref={audioRef} autoPlay/>)
            }

            <div style={{marginTop: "10px"}}>
                <button onClick={toggleVideo}>
                    {videoEnabled ? "Выключить камеру" : "Включить камеру"}
                </button>
                <button onClick={toggleAudio}>
                    {audioEnabled ? "Выключить микрофон" :
                        <img src={toDevoltonAbsoluteUrl(Config.PATH.ASSETS.CAMERA.DISABLE_CAMERA_ICON)} style={{width:"100px"}}/> }
                </button>
            </div>
        </div>
    );
};

export default VideoChat;
