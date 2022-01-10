import mongoose from "mongoose"
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: String,
    boardName: String,
    author: String,
    postId: Number,
    datePosted: String,
    timePosted: String
});

const Message = mongoose.model("Message", MessageSchema);

export const Message, MessageSchema;