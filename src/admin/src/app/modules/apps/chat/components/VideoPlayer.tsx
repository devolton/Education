import React, { FC, useEffect, useRef } from "react";

type Props = {
    stream: MediaStream;
    classes?: string;
};

const VideoPlayer: FC<Props> = ({ stream, classes }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (stream) {
            const videoTracks = stream.getVideoTracks();
            if (videoTracks.length > 0) {
                videoTracks[0].enabled = true;
            }
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return <video ref={videoRef} autoPlay playsInline className={classes} />;
};

export default VideoPlayer;
