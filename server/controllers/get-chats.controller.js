const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");

const getChats = async (req, res) => {
    try {
        const currentID = req?.user?._id;
        const chatID = req?.query?.id;

        if (!currentID || !chatID) {
            return res.status(400).json({
                success: false,
                message: "Missing user ID or chat ID",
                chats: []
            });
        }

        // Step 1: Get latest 15 messages
        const chats = await messageModel
            .find({
                $or: [
                    { sender_id: currentID, receiver_id: chatID },
                    { sender_id: chatID, receiver_id: currentID }
                ]
            })
            .sort({ createdAt: -1 }) // newest first
            .limit(15)
            .select("_id text images sender_id receiver_id time createdAt");

        if (!chats || chats.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No chats found",
                chats: []
            });
        }

        // Step 2: Reverse to oldest → newest
        const formattedChats = chats
            .reverse()
            .map(chat => ({
                _id: chat._id,
                text: chat.text,
                images: chat.images,
                sender_id: chat.sender_id,
                receiver_id: chat.receiver_id,
                time: chat.time
            }));

        return res.status(200).json({
            success: true,
            count: formattedChats.length,
            chats: formattedChats
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Unexpected Server Error"
        });
    }
};

module.exports = getChats;
