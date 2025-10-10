const messageModel = require("../models/message.model")

const sendMessage = async(req,res)=>{
    try {
        console.log(req.body);
    } catch (err) {
        console.error('Error:', err);
        
    }
}
module.exports = sendMessage