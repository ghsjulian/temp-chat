import React,{useState,useEffect} from "react";
// Call icon
import { MdAddIcCall } from "react-icons/md";
// Video call icon
import { MdVideoCall } from "react-icons/md";
import useApp from "../store/useApp";
import useSocket from "../store/useSocket";

const ChatHeader = () => {
    const { onlineUsers } = useSocket();
    const { selectedUser, setChatUser,isVideoCalling,makeVideoCall } = useApp();
    const [isOnline, setOnline] = useState(false);
    useEffect(() => {
        if (onlineUsers.includes(selectedUser?._id)) {
            setOnline(true);
        }
    }, [onlineUsers, selectedUser]);

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
                    <small style={{color : isOnline  ? "#00b61c" : "#272828"}}>{isOnline ? "Active Now" : "Offline Now"}</small>
                </div>
            </div>
            <div className="right">
                <div className="icon call">
                    <MdAddIcCall size={30} />
                </div>
                <div onClick={()=>makeVideoCall(true)} className="icon video">
                    <MdVideoCall size={45} />
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
