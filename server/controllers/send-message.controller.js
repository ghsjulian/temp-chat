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
        // check validation
        if (!text || text === "") throw new Error("Please Write A Message");
        if (isImage) {
            if (!images || images?.length === 0)
                throw new Error("No image provided");
            //TODO --> Cloudinary Will Be Applied Here...
        }
        const newMessage = await new messageModel({
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
        return res.json(newMessage);
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            success: false,
            message: error.message || "Unexpected Error Occured"
        });
    }
};
module.exports = sendMessage;
