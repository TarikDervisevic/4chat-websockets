import Board from "../models/board.js";
import { Message } from "../models/message.js";

export default class BoardsController {
    static async getXMessages(req, res, next) {
        try {
            if (req.params.last_message_id !== "first_query") { 
                var lastMessageID = Number(req.params.last_message_id) 
            };
            const currentBoardName = req.params.board;
            const numMessagesRequested = Number(req.params.num_messages_requested)

            console.log(req.params)

            if (req.params.last_message_id === "first_query") {
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
                let lastPostID;
                if (lastMessage[0]) {
                    lastPostID = lastMessage[0].postID
                } else if (!lastMessage[0]) {
                    lastPostID = 0
                }

                var messageList = await Message.find(
                    { $and: [ 
                        { "board" : currentBoardName }, 
                        { "postID" : { $gt: lastPostID - numMessagesRequested } }, 
                    ]}
                )
            } else {
                var messageList = await Message.find(
                    { $and: [ 
                        { "board" : currentBoardName }, 
                        { "postID" : { $lt: lastMessageID, $gt: lastMessageID - numMessagesRequested } }, 
                    ]}
                )
            }  
            //console.log(messageList);
            console.log(req.params)
            res.json(messageList);
        } catch (e) {
            console.log(e);
        }
    }

    static async getNewMessages(req, res, next) {
        try {
            const newestMessageID = req.params.newest_message_id;
            const board = await Board.findOne( { name: req.params.board } );
            const newMessages = await Message.find( { "postID" : { $gt: newestMessageID } } );
            res.json(newMessages);
        } catch (e) {
            console.log(e);
        }
    }

    static async postMessage(req, res, next) {
        try {
            const message = new Message;
            const board = await Board.findOne({ name: req.params.board })
            const lastMessage = await Message.find({}).sort({_id:-1}).limit(1);
            let lastPostID;
            if (lastMessage[0]) {
                lastPostID = lastMessage[0].postID
            } else if (!lastMessage[0]) {
                lastPostID = 0
            }
            console.log(req.body)
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