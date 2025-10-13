const messageModel = require("../models/message.model");

const sendMessage = async (req, res) => {
    try {
        let tempImages = [];
        const {
            text,
            images,
            isImage,
            sender_name,
            sender_id,
            sender_avatar,
            receiver_name,
            receiver_id,
            receiver_avatar,
            time,
            last_message
        } = req.body;

        // Validation
        if (!text || text.trim() === "")
            throw new Error("Please write a message");
        if (isImage) {
            if (!images || images.length === 0)
                throw new Error("No image provided");
            // TODO : --> Cloudinary Applied Here
        }

        // Create new message
        const newMessage = new messageModel({
            text,
            images: tempImages,
            sender_name,
            sender_id,
            sender_avatar,
            receiver_name,
            receiver_id,
            receiver_avatar,
            time,
            last_message,
            seen: false
        });
        await newMessage.save();
        return res.json(newMessage );
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            success: false,
            message: error.message || "Unexpected Error Occurred"
        });
    }
};

module.exports = sendMessage;
