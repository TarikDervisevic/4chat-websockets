import React from "react";
import HamburgerIcon from "../../../assets/images/sidedrawer-hamburger.png"

import classes from "./HamburgerBtn.module.css"

const HamburgerBtn = (props) => {
    return (
            <div className={classes.HamburgerBtn}>
                <img src={HamburgerIcon} className={classes.HamburgerIcon}/>
            </div>
    )
}

export default HamburgerBtn;