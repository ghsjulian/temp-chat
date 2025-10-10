import React, { useState, useEffect } from "react";
import useApp from "../store/useApp";
import useAuth from "../store/useAuth";

const Footer = () => {
    const { selectedUser, sendMessage } = useApp();
    const { user } = useAuth();
    const [text, setText] = useState("");
    const sendText = () => {
        if (!text || text === "") return;
        const tempMessage = {
            text,
            images: [],
            sender_name: user.name,
            sender_id: user._id,
            sender_avatar: user.avatar,
            receiver_name: selectedUser.name,
            receiver_id: selectedUser._id,
            receiver_avatar: selectedUser.avatar,
            time: Date.now(),
            last_message: text,
            createAt: Date.now()
        };
        sendMessage(tempMessage);
        setText("");
    };

    return (
        <footer>
            <button>
                <img src="/icons/add.png" />
            </button>
            <input
                onKeyDown={e => {
                    if (e.keyCode === 13) {
                        sendText();
                    }
                    return;
                }}
                onChange={e => setText(e.target.value)}
                value={text}
                type="text"
                placeholder="Write a message..."
            />
            <button className="send">
                <img src="/icons/send.png" />
            </button>
        </footer>
    );
};

export default Footer;
