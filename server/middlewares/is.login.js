const userModel = require("../models/user.model");
const { decodeJWT } = require("../functions/jwt-token-generator");

const isLogin = async (req, res, next) => {
    try {
        const cookie = req?.cookies?.tempchat;
        if (!cookie || cookie === null) throw new Error("No Cookie Found");
        const data = decodeJWT(cookie);
        if (!data) throw new Error("Unauthorized User");
        req.user = data;
        next();
    } catch (error) {
        return res.status(403).json({
            error: true,
            success: false,
            message: error.message || "Unexpected Server Error"
        });
    }
};

module.exports = isLogin;
