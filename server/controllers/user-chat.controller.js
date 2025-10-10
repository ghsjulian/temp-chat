const userModel = require("../models/user.model");
const messageModel = require("../models/message.model");

const getChatUsers = async (req, res) => {
    try {
        const sessionID = req.user._id;
        const users = await messageModel.find({_id:sessionID})
        return res.status(200).json(users)
    } catch (error) {
        console.error("Error In getChatUsers:", error);
    }
};
module.exports = getChatUsers;
