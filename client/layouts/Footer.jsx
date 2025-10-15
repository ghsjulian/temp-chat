import React, { useState, useEffect } from "react";
// attachment icon
import { GrAttachment } from "react-icons/gr";
// send icon
import { LuSendHorizontal } from "react-icons/lu";
import useApp from "../store/useApp";
import useAuth from "../store/useAuth";
import useSocket from "../store/useSocket";

const Footer = () => {
    const { sendMessage, setTyping } = useSocket();
    const { selectedUser } = useApp();
    const { user } = useAuth();
    const [text, setText] = useState("");
    const sendText = () => {
        if (!text || text === "") return;
        const tempMessage = {
            text,
            images: [],
            isImage: false,
            sender_name: user.name,
            sender_id: user._id,
            sender_avatar: user.avatar,
            receiver_name: selectedUser.name,
            receiver_id: selectedUser._id,
            receiver_avatar: selectedUser.avatar,
            time: Date.now(),
            last_message: text
        };
        sendMessage(tempMessage);
        setText("");
    };

    return (
        <footer>
            <div className="icon">
                <GrAttachment size={26} />
            </div>
            <input
                onKeyDown={e => {
                    setTyping(user?._id,true);
                    if (e.keyCode === 13) {
                        sendText(user?._id,false);
                    }
                    return;
                }}
                onChange={e => setText(e.target.value)}
                value={text}
                type="text"
                placeholder="Write a message..."
            />
            <div onClick={sendText} className="icon">
                <LuSendHorizontal size={29} />
            </div>
        </footer>
    );
};

export default Footer;
