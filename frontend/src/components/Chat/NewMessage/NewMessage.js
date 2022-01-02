import React from "react";

import classes from "./NewMessage.module.css"

const NewMessage = (props) => {
    return (
        <div className={classes.NewMessage}>
            <div className={classes.NewMessageBox}>
                <div 
                    className={classes.TextBox} 
                    role="textbox" 
                    contenteditable
                    aria-multiline
                    aria-autocomplete="list"
                    aria-label="Send a message">
                        lorem ipsum
                </div>
            </div>
        </div>
    )
}

export default NewMessage;