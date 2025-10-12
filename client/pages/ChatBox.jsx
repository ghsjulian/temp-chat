import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useApp from "../store/useApp";
import useSocket from "../store/useSocket";
import ChatBubble from "../components/ChatBubble";

const ChatBox = () => {
    const { activeHeader } = useApp();
    const { messages, getChats } = useSocket();
    const { id } = useParams();
    const chatBoxRef = useRef(null);
    const chatEnd = useRef(null);
    const prevLength = useRef(0);
    const firstLoad = useRef(true); // track first load
    // Header on route change
    useEffect(() => {
        if(!id) return 
        if (id) activeHeader(true);
        if (id) getChats(id);
    }, [id]);

    // Scroll behavior
    useEffect(() => {
        if (!chatBoxRef.current) return;
        if (messages.length > prevLength.current) {
            // New messages arrived, smooth scroll
            chatBoxRef.current.scrollTo({
                top: chatBoxRef.current.scrollHeight,
                behavior: "auto"
            });
        }
        prevLength.current = messages.length;
    }, [messages]);

    return (
        <div ref={chatBoxRef} className="chat-box">
            {messages?.map((chat, index) => (
                <ChatBubble
                    key={chat._id || index}
                    len={index === messages.length - 1}
                    id={chat._id}
                    text={chat.text}
                    sender={chat.sender_id}
                    time={chat.time}
                />
            ))}
        </div>
    );
};

export default ChatBox;

/*
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import useApp from "../store/useApp";
import useSocket from "../store/useSocket";
import ChatBubble from "../components/ChatBubble";

const ChatBox = () => {
    const { activeHeader, selectedUser, setChatUser } = useApp();
    const { messages } = useSocket();
    const [len, setLen] = useState(0);
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
        setLen(messages?.length);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages, chatBoxRef]);

    return (
        <div ref={chatBoxRef} className="chat-box">
            {messages?.length > 0 &&
                messages?.map((chat, index) => {
                    return (
                        <ChatBubble
                            key={index}
                            len={index === len-1}
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
*/
