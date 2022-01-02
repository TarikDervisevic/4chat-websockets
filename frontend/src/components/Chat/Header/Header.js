import React from "react";

import classes from "./Header.module.css"

const Header = (props) => {
    return (
        <div className={classes.Header}>
            <div className={classes.WelcomeText}>
                Welcome to 4chat
            </div>
            <div className={classes.AdditionalText}>
                All messages are deleted at 00:00 CET every day
            </div>
        </div>
    )
}

export default Header;