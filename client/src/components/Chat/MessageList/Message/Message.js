import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import classes from "./Message.module.css"

const Message = (props) => {
    const preResLastMessageID = useSelector(state => state.preResLastMessageID);

    useEffect(() => {
        if (props.realPostID === preResLastMessageID) {
            props.setOffsetFromTop(messageRef.current.offsetTop)
        }
    }, [preResLastMessageID])

    const messageRef = useRef();

    return (
        <div 
            className={classes.Message}
            ref={messageRef}>
            <div className={classes.PostInfo}>
                <div className={classes.Username}>
                    {props.username}
                </div>
                <div className={classes.PostDate}>
                    {props.postDate}
                </div>
                <div className={classes.PostTime}>
                    {props.postTime}
                </div>
                <div className={classes.PostID}>
                    {props.postID}
                </div>
            </div>
            <div className={classes.Text}>
                {props.text}
            </div>
        </div>
    )
}

export default Message;