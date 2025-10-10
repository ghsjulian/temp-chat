import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import useApp from "../store/useApp";
import useSocket from "../store/useSocket";
import ChatBubble from "../components/ChatBubble";

const ChatBox = () => {
    const { activeHeader, setChatUser } = useApp();
    const { messages } = useSocket();
    const location = useLocation();
    const { name, id } = useParams();
    const [path, setPath] = useState("");
    useEffect(() => {
        setPath(location.pathname);
        if (path !== "/") {
            activeHeader(true);
        }
    }, [path]);

    return (
        <div className="chat-box">
            {messages?.length > 0 &&
                messages?.map((chat, index) => {
                    return (
                        <ChatBubble
                            key={index}
                            text={chat?.text}
                            sender={chat?.sender}
                            time={chat?.time}
                        />
                    );
                })}
        </div>
    );
};

export default ChatBox;
