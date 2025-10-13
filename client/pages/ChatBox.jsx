import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useApp from "../store/useApp";
import useSocket from "../store/useSocket";
import ChatBubble from "../components/ChatBubble";

const ChatBox = () => {
    const { activeHeader } = useApp();
    const { messages, loadMoreMessages, hasMore, loadingMore } = useSocket();
    const { id } = useParams();
    const chatBoxRef = useRef(null);
    const [initialLoaded, setInitialLoaded] = useState(false);

    // Load initial messages
    useEffect(() => {
        if (!id) return;
        activeHeader(true);
        setInitialLoaded(true);
    }, [id]);

    // Scroll to bottom once after initial load
    useEffect(() => {
        if (!initialLoaded) return;
        const box = chatBoxRef.current;
        if (box) box.scrollTop = box.scrollHeight;
    }, [initialLoaded, id]);

    // Load more when scrolling to top (fetch oldest)
    const handleScroll = useCallback(async () => {
        const box = chatBoxRef.current;
        if (!box || !hasMore || loadingMore) return;
        if (box.scrollTop <= 20) {
            const oldScrollHeight = box.scrollHeight;
            await loadMoreMessages(id);
            requestAnimationFrame(() => {
                const newScrollHeight = box.scrollHeight;
                box.scrollTop = newScrollHeight - oldScrollHeight;
            });
        }
    }, [loadMoreMessages, hasMore, loadingMore]);
useEffect(() => {
        const chatBox = chatBoxRef.current;
        if (!chatBox) return;
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: "auto"
        });
    }, [messages]);
    
    return (
        <div ref={chatBoxRef} onScroll={handleScroll} className="chat-box">
            {loadingMore && <div className="loading-msg"></div>}

            {messages.map((msg, index) => (
                <ChatBubble
                    key={msg._id || index}
                    len={index === messages.length - 1}
                    id={msg._id}
                    text={msg.text}
                    sender={msg.sender_id}
                    time={msg.time}
                />
            ))}
        </div>
    );
};

export default ChatBox;

/*
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useApp from "../store/useApp";
import useSocket from "../store/useSocket";
import ChatBubble from "../components/ChatBubble";

const ChatBox = () => {
    const { activeHeader } = useApp();
    const { messages, getChats, loadMoreMessages, hasMore, loadingMore } =
        useSocket();
    const { id } = useParams();
    const chatBoxRef = useRef(null);

    // Fetch initial messages
    useEffect(() => {
        if (!id) return;
        activeHeader(true);
        getChats(id);
    }, [id]);

    // Auto scroll to bottom after first load or new message
    useEffect(() => {
        const chatBox = chatBoxRef.current;
        if (!chatBox) return;
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: "auto"
        });
    }, [messages]);

    return (
        <div ref={chatBoxRef} className="chat-box">
            {messages.map((chat, index) => (
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
*/
