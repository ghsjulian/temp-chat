const userModel = require("../models/user.model");
const { createHash } = require("../functions/password-hashing");

const seedUsers = async (name,email, password) => {
    try {
        if (!name && !email && !password)
            throw new Error("All fields are required");
        const existUser = await userModel.findOne({
            email: email.trim()        });
        if (existUser) throw new Error("User Already Registered");
        const hash = await createHash(password.trim());
        const newUser = await new userModel({
            name,
            email,
            password: hash
        });
        await newUser.save();
    return "Users Sedded Successfully"
    } catch (error) {
        return error.message
    }
};

module.exports = seedUsers;
