import React, { useState, useEffect, useRef } from "react";
import sendIcon from "../../../assets/images/send-icon.png";

import classes from "./NewMessage.module.css"

const NewMessage = (props) => {
    const [placeholderDiv, setPlaceholderDiv] = useState(null);
    const [keysDown, setKeysDown] = useState([]);

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

    const addKeyDown = (key) => {
        let currentKeysDown = keysDown;
        if (!currentKeysDown.includes(key)) {
            currentKeysDown.push(key);
            setKeysDown(currentKeysDown);
        } 
    }

    const removeKeyDown = (key) => {
        let currentKeysDown = keysDown;
        const i = currentKeysDown.indexOf(key);
        currentKeysDown.splice(i, 1);
        setKeysDown(currentKeysDown);
    }

    const sendMessageHandler = (fromSendButton) => {
        if ((keysDown.includes(13) && !keysDown.includes(16)) || fromSendButton) {
            props.sendMessage()
            if (inputRef.current.innerText.length < 500) {
                inputRef.current.innerText = "";
            }
            setKeysDown([]);
        }
    }

    useEffect(() => {
        sendMessageHandler(null);
        console.log(keysDown);
    }, [JSON.stringify(keysDown)])

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
                    onKeyDown={e => addKeyDown(e.keyCode)}
                    onKeyUp={e => removeKeyDown(e.keyCode)}
                    onInput={e => inputHandler(e)}
                    value={props.newMessage}>
                </div>
            </div>
            <div className={classes.SendButtonContainer}>
                <button className={classes.SendButton} onClick={() => {sendMessageHandler(true)}}>
                    <img className={classes.SendIcon} alt="sendIcon" src={sendIcon}/>
                </button>
            </div>
        </div>
    )
}

export default NewMessage;