import React, { useState, useEffect, useRef } from "react";
import sendIcon from "../../../assets/images/send-icon.png";

import classes from "./NewMessage.module.css"

const NewMessage = (props) => {
    const [placeholderDiv, setPlaceholderDiv] = useState(null)

    const placeholderDivJSX = 
        <div 
            className={classes.Placeholder}
            unselectable="on">
            Send a message
        </div>

    const inputRef = useRef();

    const inputHandler = (e) => {
        props.setNewMessage(e.target.innerText)
    }

    const sendMessageHandler = (keyCode, fromSendButton) => {
        if (keyCode === 13 || fromSendButton) {
            props.sendMessage()
            inputRef.current.innerText = "";
        }
    }

    const preventEnterDefault = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
        }
    }

    useEffect(() => {
        if (props.newMessage === "") {
            setPlaceholderDiv(placeholderDivJSX)
        } else if (props.newMessage !== "") {
            setPlaceholderDiv(null)
        }
    }, [props.newMessage])

    return (
        <div className={classes.NewMessage}>
            <div className={classes.NewMessageBox}>
                    {placeholderDiv}
                <div 
                    className={classes.TextBox} 
                    ref={inputRef}
                    role="textbox" 
                    contentEditable
                    aria-multiline
                    aria-autocomplete="list"
                    aria-label="Send a message"
                    onKeyDown={e => {sendMessageHandler(e.keyCode); preventEnterDefault(e);}}
                    onInput={e => inputHandler(e)}
                    value={props.newMessage}>
                </div>
            </div>
            <div className={classes.SendButtonContainer}>
                <button className={classes.SendButton} onClick={() => {sendMessageHandler(null, true)}}>
                    <img className={classes.SendIcon} alt="sendIcon" src={sendIcon}/>
                </button>
            </div>
        </div>
    )
}

export default NewMessage;