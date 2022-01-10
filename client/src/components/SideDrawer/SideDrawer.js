import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux"

import classes from "./SideDrawer.module.css"

const SideDrawer = (props) => {
    const [sideDrawerClasses, setSideDrawerClasses] = useState(`${classes.SideDrawer} ${classes.InitialHideSideDrawer}`)

    const showSideDrawer = useSelector(state => state.showSideDrawer)

    const renderCounter = useRef(0);

    useEffect(() => {
        if (renderCounter.current > 0) {
            if (showSideDrawer === false) {
                setSideDrawerClasses(`${classes.SideDrawer} ${classes.HideSideDrawer}`)
            } else if (showSideDrawer === true) {
                setSideDrawerClasses(`${classes.SideDrawer} ${classes.ShowSideDrawer}`)
            }
        } else renderCounter.current++
    }, [showSideDrawer])

    return (
        <div className={sideDrawerClasses}>
            <div className={classes.UsernameMenu}>
                <div className={classes.UsernameLabel}>Username</div>
                <input 
                    type="text"
                    className={classes.UsernameInput}
                    placeholder="Anonymous"
                />
                <button className={classes.UsernameSetButton}>Set</button>
            </div>
            
        </div>
    )
}

export default SideDrawer;