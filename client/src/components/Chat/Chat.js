import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import MessageList from "./MessageList/MessageList";
import NewMessage from "./NewMessage/NewMessage";

import classes from "./Chat.module.css"

const Chat = (props) => {
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = (e) => {
        console.log("the message is:" + newMessage)
    }

    return (
        <div className={classes.Chat}>
            <Header/>
            <MessageList/>
            <NewMessage setNewMessage={setNewMessage} sendMessage={sendMessage} newMessage={newMessage}/>
        </div>
    )
}

export default Chat;