const userModel = require("../models/user.model");

const searchController = async (req, res) => {
    try {
        const query = req?.query.q || "";
        if (!query) throw new Error("Query isn't defined");
        const users = await userModel
            .find({
                _id: { $ne: req.user._id }, // exclude current user
                name: { $regex: query, $options: "i" } // case-insensitive search
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
module.exports = searchController;
