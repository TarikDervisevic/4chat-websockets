import Board from "../models/board";
import Message from "../models/message";

export default class BoardsController {
    static async getXMessages(req, res, next) {
        const lastMessageID = req.body.lastMessageID;
        const currentBoard = req.body.currentBoard;
        try {
            const messageList = await currentBoard.aggregate(
            [
                {$match: {"messages.postID": {$and: [{$gt: lastMessageID}, {$lt: lastMessageID + 30}] } } },
            ]
        )} catch {
            console.log(e);
        }
    }

    static async postMessage(req, res, next) {
        const message = new Message(req.body);
        const board = await Board.find({ name: req.params.boardname })
        message.author = user.username;
        board.messages.push(message);
        await message.save();
        await board.save();
        res.status(201);
    }

    static async clearBoards() {
        await Board.updateMany({
            "name" : "general 1"
        }, {
            $set: { messages: [] }
        }, function (error, result) {
            console.log(result);
        }
    )    
    }
}