import mongoose from "mongoose"
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    name: String,
    totalMessages: Number,
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});

const Board = mongoose.model("Board", BoardSchema)

export default Board;