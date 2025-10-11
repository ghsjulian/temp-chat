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
                chats : []
            });
        }

        const chats = await messageModel
            .find({
                $or: [
                    { sender_id: currentID, receiver_id: chatID },
                    { sender_id: chatID, receiver_id: currentID }
                ]
            })
            .select("_id text images sender_id receiver_id time createdAt") // only these fields
            .sort({ createdAt: 1 }); // oldest → newest
        
        if(!chats || chats?.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No chats found",
                chats : []
            });
        }
        // Rename createdAt to time in the response
        const formattedChats = chats.map(chat => ({
            _id : chat._id,
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
