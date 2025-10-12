import React from "react";
import useAuth from "../store/useAuth";
import timeAgo from "../libs/formatter";

const ChatBubble = ({ len, id, text, sender, time }) => {
    const { user } = useAuth();
    const isMe = user?._id === sender ? "sent" : "received";

    return (
        <>
            <div
                style={{ animation: len&&"shake .6s linear" }}
                className={`message ${isMe}`}
            >
                {text}
                <div className="message-time">{timeAgo(parseInt(time))}</div>
            </div>
            {/*
            <div className="message received">
                Hello!
                <div className="message-time">10:00 AM</div>
            </div>
            <div className="message sent">
                Hi Alice!
                <div className="message-time">10:01 AM</div>
            </div>
            <div className="message received">
                Hey, how are you?
                <div className="message-time">10:02 AM</div>
            </div>
            */}
        </>
    );
};

export default ChatBubble;
