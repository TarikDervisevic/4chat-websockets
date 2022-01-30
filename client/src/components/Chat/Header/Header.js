import React from "react";
import { useSelector } from "react-redux";

import classes from "./Header.module.css"

const Header = (props) => {
    const screenSize = useSelector(state => state.screenSize);

    return (
        <div className={classes.Header}>
            <div className={screenSize === "small" || screenSize === "extraSmall" ? classes.WelcomeTextSmall : classes.WelcomeText}>
                Welcome to 4chat
            </div>
            <div className={classes.AdditionalText}>
                All messages are deleted at 00:00 CET every day
            </div>
        </div>
    )
}

export default Header;