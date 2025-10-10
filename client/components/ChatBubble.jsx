import React from "react";

const ChatBubble = ({text,sender,time}) => {
    return (
        <>
            <div className={`message ${sender}`}>
                {text}
                <div className="message-time">{time}</div>
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
