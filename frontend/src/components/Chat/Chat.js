import React from "react";
import Header from "./Header/Header";
import MessageList from "./MessageList/MessageList";
import NewMessage from "./NewMessage/NewMessage";

import classes from "./Chat.module.css"

const Chat = (props) => {
    return (
        <div className={classes.Chat}>
            <Header/>
            <MessageList/>
            <NewMessage/>
        </div>
    )
}

export default Chat;