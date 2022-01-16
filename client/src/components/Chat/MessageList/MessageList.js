import React, { useEffect, useRef } from "react";
import Message from "./Message/Message";

import classes from "./MessageList.module.css"

const MessageList = (props) => {
    
    const messageListRef = useRef();

    const scrollToBottom = () => {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }

    const getDate = (UNIXtimestamp) => {
        const dateObj = new Date(UNIXtimestamp);
        const day = dateObj.getDate();
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();
        const date = `${day}\\${month + 1}\\${year}`;
        return date;
    }

    const getTime = (UNIXtimestamp) => {
        const dateObj = new Date(UNIXtimestamp);
        let hours = String(dateObj.getHours());
        if (hours.length === 1) {
            hours = `0${hours}`
        };
        let minutes = String(dateObj.getMinutes());
        if (minutes.length === 1) {
            minutes = `0${minutes}`
        };
        let seconds = String(dateObj.getSeconds());
        if (seconds.length === 1) {
            seconds = `0${seconds}`
        };
        const time = `${hours}:${minutes}:${seconds}`;
        return time;
    }

    const getPostID = (rawID) => {
        let postID = String(rawID);
        for (let i = 0; i < 8 - rawID.toString().length; i++) {
            postID = "0" + postID;
        }
        postID = "#" + postID;
        return postID;
    }

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 1);
    }, [props.messages])

    return (
        <div 
            className={classes.MessageList}
            ref={messageListRef}>

            {props.messages && props.messages.map((message, i) => 
                <Message 
                    key={i}
                    text={message.text} 
                    username={message.author} 
                    postDate={getDate(message.timePosted)}
                    postTime={getTime(message.timePosted)}
                    postID={getPostID(message.postID)}
                />)}
        </div>
    )
}

export default MessageList;