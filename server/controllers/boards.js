import Board from "../models/board.js";
import { Message } from "../models/message.js";

export default class BoardsController {
    static async getXMessages(req, res, next) {
        try {
            const lastMessageID = Number(req.body.lastMessageID);
            const currentBoardName = req.body.currentBoardName;
            let messageList = await Message.find(
                { $and: [ 
                    { "board" : currentBoardName }, 
                    { "postID" : { $gt: lastMessageID, $lt: lastMessageID + 15 } }, 
                ]}
            )
            console.log(messageList)
            res.json(messageList);
        } catch (e) {
            console.log(e);
        }
    }

    static async postMessage(req, res, next) {
        try {
            const message = new Message;
            const board = await Board.findOne({ name: req.params.boardname })
            const lastMessage = await Message.aggregate(
                [
                    { $group: 
                        { 
                            _id: "$author",
                            postID: { $max: "$postID" } 
                        }
                    }
                ]
            )
            const lastPostID = lastMessage[0].postID
            message.author = req.body.username;
            message.text = req.body.text;
            message.board = req.params.board;
            message.postID = lastPostID + 1;
            message.timePosted = Date.now();
            board.messages.push(message._id);
            board.totalMessages = board.messages.length;
            await board.save();
            await message.save();
        res.status(201);
        res.json("Success")
        } catch (e) {
            console.log(e)
        }
    }

    static async clearMessages() {
        try {
            await Board.updateMany({
                "name" : "general1"
            }, {
                $set: { messages: [] }
            }, function (error, result) {
                console.log(result);
            }).clone();
            await Message.deleteMany({});

        } catch (e) {
            console.log(e)
        }
          
    }
}