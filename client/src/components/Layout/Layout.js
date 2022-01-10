import React from "react";
import ChatPage from "../../pages/ChatPage/ChatPage";

import classes from "./Layout.module.css"

const Layout = (props) => {
    return (
        <div className={classes.Layout}>
            <ChatPage/>
        </div>
    )
}

export default Layout;