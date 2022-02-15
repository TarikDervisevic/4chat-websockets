import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"

import classes from "./SideDrawer.module.css"

const SideDrawer = (props) => {
    const [sideDrawerClasses, setSideDrawerClasses] = useState(`${classes.SideDrawer} ${classes.InitialHideSideDrawer}`)

    const dispatch = useDispatch();

    const showSideDrawer = useSelector(state => state.showSideDrawer)

    const renderCounter = useRef(0);

    const inputRef = useRef();

    const setUsernameHandler = (username) => {
        dispatch({
            type: "setUsername",
            payload: {
                username: username
            }
        })
    }

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
                    ref={inputRef}
                    maxLength={12}
                    className={classes.UsernameInput}
                    placeholder="Anonymous"
                />
                <button 
                    className={classes.UsernameSetButton}
                    onClick={() => {setUsernameHandler(inputRef.current.value)}}>
                    Set</button>
            </div>
            
        </div>
    )
}

export default SideDrawer;