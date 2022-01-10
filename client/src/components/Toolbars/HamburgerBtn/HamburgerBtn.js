import React from "react";
import { useDispatch } from "react-redux";
import HamburgerIcon from "../../../assets/images/sidedrawer-hamburger.png"

import classes from "./HamburgerBtn.module.css"

const HamburgerBtn = (props) => {
    const dispatch = useDispatch();

    const openSideDrawerHandler = () => {
        dispatch({
            type: "setShowSideDrawer"
        })
    }

    return (
            <div 
                className={classes.HamburgerBtn}
                onClick={openSideDrawerHandler}>
                <img src={HamburgerIcon} className={classes.HamburgerIcon}/>
            </div>
    )
}

export default HamburgerBtn;