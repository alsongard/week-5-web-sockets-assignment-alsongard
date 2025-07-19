const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        message:{type:String, trim:true},
        user_id:{type:mongoose.Types.ObjectId, ref:"User"},
    },
    {timestamps:true}
)

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message;