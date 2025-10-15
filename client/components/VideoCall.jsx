import React, { useEffect, useRef, useState } from "react";
import useAuth from "../store/useAuth";
import useApp from "../store/useApp";
import useSocket from "../store/useSocket";

const VideoCall = () => {
    const { user } = useAuth();
    const { selectedUser, setSelectedUser, makeVideoCall, isVideoCalling } =
        useApp();
    const { socket } = useSocket();

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const mediaRecorderRef = useRef(null);
    const [videoStream, setVideoStream] = useState(null);

    // Get local media
    useEffect(() => {
        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setVideoStream(stream);
                if (localVideoRef.current)
                    localVideoRef.current.srcObject = stream;
            } catch (err) {
                console.error("Media error:", err);
            }
        };
        getMedia();
    }, []);

    return (
        <div className="call-page">
            <div className="video-call">
                <div className="local-video">
                    <video
                        id="local"
                        ref={localVideoRef}
                        muted
                        autoPlay
                        playsInline
                    />
                </div>
                <video ref={remoteVideoRef} autoPlay playsInline />
            </div>

            <div className="controll">
                {/*
                <button>Start Call</button>
                <button>Mute Call</button>
                */}
                <button onClick={() => makeVideoCall(false)}>Cancel Call</button>
            </div>
        </div>
    );
};

export default VideoCall;

/*
import React, { useEffect, useRef, useState } from "react";
import useAuth from "../store/useAuth";
import useApp from "../store/useApp";
import useSocket from "../store/useSocket";

const VideoCall = () => {
    const { user } = useAuth();
    const { selectedUser } = useApp();
    const { socket, connected, onlineUsers } = useSocket();

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const mediaRecorderRef = useRef(null);
    const [videoStream, setVideoStream] = useState(null);
    const [callStarted, setCallStarted] = useState(false);

    const micOnRef = useRef(true);
    const cameraOnRef = useRef(true);

    // 1️⃣ Get local media
    useEffect(() => {
        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setVideoStream(stream);
                localVideoRef.current.srcObject = stream;
            } catch (err) {
                console.error("Media error:", err);
            }
        };
        getMedia();

        return () => {
            videoStream?.getTracks().forEach(track => track.stop());
            stopCall();
        };
    }, []);

    // 2️⃣ Start call with MediaSource streaming
    const startCall = () => {
        if (!videoStream || !selectedUser?._id) return;
        const mediaRecorder = new MediaRecorder(videoStream, {
            mimeType: "video/webm; codecs=vp8,opus"
        });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                socket.emit("start-video-call", {
                    to: selectedUser._id,
                    from: user?._id,
                    chunk: event.data
                });
            }
        };

        mediaRecorder.start(100); // send chunks every 100ms
        setCallStarted(true);
    };

    const stopCall = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== "inactive"
        ) {
            mediaRecorderRef.current.stop();
        }
        setCallStarted(false);
        if (selectedUser?._id)
            socket.emit("end-call", { to: selectedUser._id });
    };

    // 3️⃣ Smooth playback using MediaSource
    useEffect(() => {
        if (!remoteVideoRef.current) return;

        const mediaSource = new MediaSource();
        remoteVideoRef.current.src = URL.createObjectURL(mediaSource);

        mediaSource.addEventListener("sourceopen", () => {
            const sourceBuffer = mediaSource.addSourceBuffer(
                'video/webm; codecs="vp8,opus"'
            );
            let queue = [];

            const appendChunk = chunk => {
                if (sourceBuffer.updating || queue.length > 0) {
                    queue.push(chunk);
                } else {
                    sourceBuffer.appendBuffer(chunk);
                }
            };

            sourceBuffer.addEventListener("updateend", () => {
                if (queue.length > 0) {
                    const nextChunk = queue.shift();
                    sourceBuffer.appendBuffer(nextChunk);
                }
            });

            // receive chunks from socket
            socket.on("incomming-call", callStream => {
                // console.log(callStream.chunk);
                appendChunk(new Uint8Array(callStream?.chunk))
                const reader = new FileReader();
                reader.onload = async() => {
                    appendChunk(new Uint8Array(await reader.result));
                };
                reader.readAsArrayBuffer(callStream?.chunk);
                
            });

            socket.on("call-ended", () => stopCall());
        });
    }, [remoteVideoRef.current]);

    // 4️⃣ Toggle mic & camera
    const toggleMic = () => {
        videoStream
            ?.getAudioTracks()
            .forEach(track => (track.enabled = !micOnRef.current));
        micOnRef.current = !micOnRef.current;
    };

    const toggleCamera = () => {
        videoStream
            ?.getVideoTracks()
            .forEach(track => (track.enabled = !cameraOnRef.current));
        cameraOnRef.current = !cameraOnRef.current;
    };

    return (
        <div className="call-page">
            <div className="video-call">
                <video ref={localVideoRef} muted autoPlay playsInline />
                <video ref={remoteVideoRef} autoPlay playsInline />
            </div>
            <div className="controls">
                {!callStarted && (
                    <button onClick={startCall}>Start Call</button>
                )}
                {callStarted && <button onClick={stopCall}>End Call</button>}
                <button onClick={toggleMic}>
                    {micOnRef.current ? "Mute Mic" : "Unmute Mic"}
                </button>
                <button onClick={toggleCamera}>
                    {cameraOnRef.current ? "Stop Camera" : "Start Camera"}
                </button>
            </div>
        </div>
    );
};

export default VideoCall;

*/
