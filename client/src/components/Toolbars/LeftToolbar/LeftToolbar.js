import React from "react";
import HamburgerBtn from "../HamburgerBtn/HamburgerBtn";

import classes from "./LeftToolbar.module.css"

const LeftToolbar = (props) => {
    return (
            <div className={classes.LeftToolbar}>
                <HamburgerBtn/>
            </div>
    )
}

export default LeftToolbar;