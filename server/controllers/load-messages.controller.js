const Message = require("../models/message.model");

const loadOlderMessages = async (req, res) => {
    try {
        const { id, before } = req.query;
        const currentUserId = req.user._id;
        const filter = {
            $or: [
                { sender_id: currentUserId, receiver_id: id },
                { sender_id: id, receiver_id: currentUserId }
            ],
            time: { $lt: before }
        };
        const messages = await Message.find(filter)
            .sort({ time: -1 })
            .limit(15);
        return res.json({
            success: true,
            messages: messages.reverse() // oldest to newest
        });
    } catch (error) {
        console.error("Error loading older messages:", error);
        res.status(500).json({ success: false });
    }
};

module.exports = loadOlderMessages;
