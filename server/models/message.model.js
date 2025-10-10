const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        sender_name: {
            type: String,
            required: true
        },
        sender_id: {
            type: String,
            required: true,
            unique: true
        },
        sender_avatar: {
            type: String,
            default: ""
        },
        receiver_name: {
            type: String,
            required: true
        },
        receiver_id: {
            type: String,
            required: true,
            unique: true
        },
        receiver_avatar: {
            type: String,
            default: ""
        },
        text : {
            type : String,
            required : true
        },
        images : {
            type : Array,
            default : []
        },
        last_message : {
            type : String,
            default : ""
        },
        seen : {
            type : Boolean,
            default : false,
        }
        
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
