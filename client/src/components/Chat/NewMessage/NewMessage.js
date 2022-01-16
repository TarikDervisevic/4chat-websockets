import React, { useState, useEffect, useRef } from "react";

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

    const sendMessageHandler = (e) => {
        if (e.keyCode === 13) {
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
                    onKeyDown={e => {sendMessageHandler(e); preventEnterDefault(e);}}
                    onInput={e => inputHandler(e)}
                    value={props.newMessage}>
                </div>
            </div>
        </div>
    )
}

export default NewMessage;