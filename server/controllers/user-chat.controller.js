const Message = require("../models/message.model");

const getChatUsers = async (req, res) => {
    try {
        const currentUserId = req.user._id;

        // Get all messages involving the current user, sorted newest first
        const messages = await Message.find({
            $or: [{ sender_id: currentUserId }, { receiver_id: currentUserId }]
        }).sort({ time: -1 });

        const chatsMap = new Map();

        messages.forEach(msg => {
            let chatUser 
            const otherUserId =
                msg.sender_id.toString() === currentUserId.toString()
                    ? msg.receiver_id.toString()
                    : msg.sender_id.toString();
            if(msg.sender_id.toString() === currentUserId.toString()){
                chatUser = msg.receiver_id
            }else {
                chatUser = msg.sender_id
            }
            // Only keep the first (latest) message per user
            if (!chatsMap.has(otherUserId)) {
                chatsMap.set(otherUserId, {
                    _id: chatUser,
                    user_id: otherUserId,
                    name:
                        msg.sender_id.toString() === currentUserId.toString()
                            ? msg.receiver_name
                            : msg.sender_name,
                    avatar:
                        msg.sender_id.toString() === currentUserId.toString()
                            ? msg.receiver_avatar
                            : msg.sender_avatar,
                    last_message: msg.text,
                    time: msg.time
                });
            }
        });

        // Convert map to array
        const chats = Array.from(chatsMap.values());

        return res.json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = getChatUsers;
