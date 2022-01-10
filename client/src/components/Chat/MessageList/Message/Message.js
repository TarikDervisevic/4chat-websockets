import React from "react";

import classes from "./Message.module.css"

const Message = (props) => {
    return (
        <div className={classes.Message}>
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