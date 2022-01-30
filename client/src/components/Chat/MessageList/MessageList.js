import React, { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message/Message";

import classes from "./MessageList.module.css"

const MessageList = forwardRef((props, ref) => {

    const dispatch = useDispatch();

    const lastMessageOffsetTop = useSelector(state => state.lastMessageOffsetTop);
    const lastMessageID = useSelector(state => state.lastMessageID);

    useImperativeHandle(ref, () => ({
        scrollToPreResLastMessage() {
            messageListRef.current.scrollTop = lastMessageOffsetTop - 180;
            console.log("child function triggered")
            console.log(lastMessageOffsetTop)
        },
        scrollToBottom() {
            scrollToBottom();
        }
    }))
    
    const messageListRef = useRef();
    const timesJumpedToBottom = useRef(0);

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
        if (timesJumpedToBottom.current === 0 && props.messages.length) {
            setTimeout(() => {
                scrollToBottom();
                timesJumpedToBottom.current++
                
            }, 1);
        }
    }, [props.messages])

    useEffect(() => {
        if (messageListRef.current.scrollTop === messageListRef.current.scrollHeight) {

        }
    }, [props.messages])

    return (
        <div 
            className={classes.MessageList}
            ref={messageListRef}
            onScroll={(e) => {
                props.onScrollToTop(e);
                props.setMessageListScrollHeight(e.target.scrollHeight);
                props.setMessageListScrollTop(e.target.scrollTop);
                props.setClientHeight(e.target.clientHeight);
            }}>
                { props.messages > 8 ? <div className={classes.CoverSpin}/> : null }

            {props.messages && props.messages.map((message, i) => 
                <Message 
                    key={i}
                    text={message.text} 
                    username={message.author} 
                    postDate={getDate(message.timePosted)}
                    postTime={getTime(message.timePosted)}
                    postID={getPostID(message.postID)}
                    realPostID={(message.postID)}
                    setOffsetFromTop={props.setOffsetFromTop}
                />)}
        </div>
    )
})

export default MessageList;