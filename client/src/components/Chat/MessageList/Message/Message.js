import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import classes from "./Message.module.css"

const Message = (props) => {
    const preResLastMessageID = useSelector(state => state.preResLastMessageID);
    const screenSize = useSelector(state => state.screenSize);

    useEffect(() => {
        if (props.realPostID === preResLastMessageID) {
            props.setOffsetFromTop(messageRef.current.offsetTop)
        }
    }, [preResLastMessageID])

    const messageRef = useRef();

    return (
        <div 
            className={`${classes.Message} ${screenSize === "small" || screenSize === "extraSmall" ? classes.MessageSmall : null}`}
            ref={messageRef}>
            <div className={`${classes.PostInfo} ${screenSize === "small" || screenSize === "extraSmall" ? classes.PostInfoSmall : null}`}>
                <div className={classes.Username}>
                    {props.username}
                </div>
                <div className={`${classes.PostDate} ${screenSize === "small" || screenSize === "extraSmall" ? classes.PostDateSmall : null}`}>
                    {props.postDate}
                </div>
                <div className={`${classes.PostTime} ${screenSize === "small" || screenSize === "extraSmall" ? classes.PostTimeSmall : null}`}>
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