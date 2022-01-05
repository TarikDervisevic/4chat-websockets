import React, { useEffect, useRef } from "react";
import Message from "./Message/Message";

import classes from "./MessageList.module.css"

const MessageList = (props) => {
    const messages = [
        {text: "Hello everyone how are you all doing?", 
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
            postID: "#00000259"}
    ]

    const messageListRef = useRef();

    useEffect(() => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }, [])

    return (
        <div 
            className={classes.MessageList}
            ref={messageListRef}>

            {messages.map((message, i) => 
                <Message 
                    key={i}
                    text={message.text} 
                    username={message.username} 
                    postDate={message.postDate}
                    postTime={message.postTime}
                    postID={message.postID}
                />)}
        </div>
    )
}

export default MessageList;