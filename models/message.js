import mongoose from "mongoose"
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: String,
    author: String,
    postID: Number,
    board: String,
    timePosted: Number,
    socketID: String
});

const Message = mongoose.model("Message", MessageSchema);

export { Message, MessageSchema };