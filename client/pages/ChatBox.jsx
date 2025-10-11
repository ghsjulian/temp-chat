import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import useApp from "../store/useApp";
import useSocket from "../store/useSocket";
import ChatBubble from "../components/ChatBubble";

const ChatBox = () => {
    const { activeHeader, selectedUser, setChatUser } = useApp();
    const { messages } = useSocket();
    const location = useLocation();
    const { name, id } = useParams();
    const [path, setPath] = useState("");
    const chatBoxRef = useRef(null);
    useEffect(() => {
        setPath(location.pathname);
        if (path !== "/") {
            activeHeader(true);
        }
    }, [path]);
    useEffect(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages, chatBoxRef]);

    return (
        <div ref={chatBoxRef} className="chat-box">
            {messages?.length > 0 &&
                messages?.map((chat, index) => {
                    return (
                        <ChatBubble
                            key={index}
                            id={chat?._id}
                            text={chat?.text}
                            sender={chat?.sender_id}
                            time={chat?.time}
                        />
                    );
                })}
        </div>
    );
};

export default ChatBox;
