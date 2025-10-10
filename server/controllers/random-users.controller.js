const userModel = require("../models/user.model");

const randomUsers = async (req, res) => {
    try {
        const users = await userModel
            .find({
                _id: { $ne: req.user._id }
            })
            .select("-password")
            .limit(10);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message || "Unexpected Server Error"
        });
    }
};
module.exports = randomUsers;
