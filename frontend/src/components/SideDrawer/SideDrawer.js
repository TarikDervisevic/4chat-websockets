import React from "react";

import classes from "./SideDrawer.module.css"

const SideDrawer = (props) => {
    return (
        <div className={classes.SideDrawer}>
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