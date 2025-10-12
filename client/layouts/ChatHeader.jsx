import React from "react";
// Call icon
import { MdAddIcCall } from "react-icons/md";
// Video call icon
import { MdVideoCall } from "react-icons/md";
import useApp from "../store/useApp";

const ChatHeader = () => {
    const { selectedUser, setChatUser } = useApp();

    return (
        <div className="chat-header">
            <div className="left">
                <img
                    id="avatar"
                    src={
                        selectedUser?.avatar
                            ? selectedUser?.avatar
                            : "/icons/user.png"
                    }
                />
                <div className="user">
                    <span>{selectedUser.name}</span>
                    <small>Active Now</small>
                </div>
            </div>
            <div className="right">
                <div className="icon call">
                    <MdAddIcCall size={30} />
                </div>
                <div className="icon video">
                    <MdVideoCall size={45} />
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
