import mongoose from "mongoose"
import { MessageSchema } from "./message.js"
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    name: String,
    totalMessages: Number,
    messages: [
        MessageSchema
    ]
});

const Board = mongoose.model("Board", BoardSchema)

export default Board;