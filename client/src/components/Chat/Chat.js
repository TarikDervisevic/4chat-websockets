import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header/Header";
import MessageList from "./MessageList/MessageList";
import NewMessage from "./NewMessage/NewMessage";
import MessageDataService from "../../services/messages";

import classes from "./Chat.module.css"

const Chat = (props) => {

    const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const username = useSelector(state => state.username);
    const board = useSelector(state => state.board);

    useEffect(() => {
        let req = { 
            numRequestedMessages: 15, 
            lastMessageID: "first_query" 
        }
            MessageDataService.getXMessages(board, req.numRequestedMessages, req.lastMessageID)
                .then((response) => {
                    setMessages(response.data); 
                    console.log(response.data);
                    let lastMessageID = response.data[0].postID;
                    dispatch({
                        type: "setLastMessageID",
                        payload: {
                            lastMessageID
                        }
                    })
                })
            
    }, [])

    const sendMessage = (e) => {
        let message = {
            username,
            text: newMessage
        }
        MessageDataService.postMessage(board, message)
        setNewMessage("");
    }

    return (
        <div className={classes.Chat}>
            <Header/>
            <MessageList messages={messages}/>
            <NewMessage 
                setNewMessage={setNewMessage} 
                sendMessage={sendMessage} 
                newMessage={newMessage} />
        </div>
    )
}

export default Chat;

/*{text: "Hello everyone how are you all doing?", 
            username: "Anonymous", 
            postDate: "31/12/21", 
            postTime: "18:29", 
            postID: "#00000259"}, 
        {text: "I am working on a new project!", 
            username: "Anonymous", postDate: "31/12/21", 
            postDate: "31/12/21",
            postTime: "18:29", 
            postID: "#00000259"}, 
        {text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod ipsum dolor sit amet consectetur adipiscing elit sed eiusmod ipsum dolor sit amet consectetur adipiscing elit sed eiusmod ipsum dolor sit amet consectetur adipiscing elit sed eiusmod", 
            username: "Anonymous", 
            postDate: "31/12/21", 
            postTime: "18:29", 
            postID: "#00000259"},
        {text: "Hello everyone how are you all doing?", 
            username: "Anonymous", 
            postDate: "31/12/21", 
            postTime: "18:29", 
            postID: "#00000259"}, 
        {text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod ipsum dolor sit amet consectetur adipiscing elit sed eiusmod ipsum dolor sit amet consectetur adipiscing elit sed eiusmod ipsum dolor sit amet consectetur adipiscing elit sed eiusmod", 
            username: "Anonymous", 
            postDate: "31/12/21", 
            postTime: "18:29", 
            postID: "#00000259"},
        {text: "Hello everyone how are you all doing?", 
            username: "Anonymous", 
            postDate: "31/12/21", 
            postTime: "18:29", 
            postID: "#00000259"}, 
        {text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod ipsum dolor sit amet consectetur adipiscing elit sed eiusmod ipsum dolor sit amet consectetur adipiscing elit sed eiusmod ipsum dolor sit amet consectetur adipiscing elit sed eiusmod", 
            username: "Anonymous", 
            postDate: "31/12/21", 
            postTime: "18:29", 
            postID: "#00000259"},
        {text: "Hello everyone how are you all doing?", 
            username: "Anonymous", 
            postDate: "31/12/21", 
            postTime: "18:29", 
            postID: "#00000259"}*/