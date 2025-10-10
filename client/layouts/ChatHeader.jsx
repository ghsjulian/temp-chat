import React from "react";
import useApp from "../store/useApp";

const ChatHeader = () => {
    const { selectedUser } = useApp();

    return (
        <div className="chat-header">
            <div className="left">
                <img id="avatar" src={selectedUser?.avatar? selectedUser?.avatar:"/icons/user.png"} />
                <div className="user">
                    <span>{selectedUser.name}</span>
                    <small>Active Now</small>
                </div>
            </div>
            <div className="right">
                <button id="audio-call">
                    <img src="/icons/calling.png" />
                </button>
                <button id="video-call">
                    <img src="/icons/video.png" />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
