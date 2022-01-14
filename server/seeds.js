import dotenv from "dotenv";
import mongoose from "mongoose";
import Board from "./models/board.js"
import { Message } from "./models/message.js";

dotenv.config();

const port = process.env.PORT || 8000

mongoose.connect(process.env.FOURCHAT_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const pickRdmValue = (array) => {
    const index = Math.floor(Math.random()*array.length)
    return array[index];
}

const createBoard = async () => {
    let board = new Board;

    board.name = "general1";
    board.totalMessages = 0;
    board.messages = [];

    await board.save()
}

const seedMessages = async (e) => {
    try {
        
        let messages = [];
        let board = await Board.findOne({ name : "general1" });
        board.messages = [];
        await Message.deleteMany({}).then(console.log("Cleared message collection"))
        const messageTexts = ["lorem ipsum", "dolor sit amet consectetur", "sed eiusmod adipiscing elit lorem dolor amet consectetur"]
        for (let i = 0; i < 35; i++) {
            let messageObject = new Message;
            messageObject.text = pickRdmValue(messageTexts);
            messageObject.author = "Anonymous";
            messageObject.board = "general1"
            messageObject.timePosted = Date.now();
            messageObject.postID = i + 1;
            await messageObject.save();
            board.messages.push(messageObject._id) 
        }
        board.totalMessages = board.messages.length
        await board.save();
    } catch (e) {
        console.log(e)
    }
    
}

/*
createBoard().then(() => {
    console.log("Successfully inserted board");
    mongoose.connection.close();
})
*/

seedMessages().then(() => {
    console.log("Successfully seeded messages");
    mongoose.connection.close();
})