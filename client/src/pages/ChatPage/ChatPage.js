import React from "react";
import Chat from "../../components/Chat/Chat";
import LeftToolbar from "../../components/Toolbars/LeftToolbar/LeftToolbar";
import RightToolbar from "../../components/Toolbars/RightToolbar/RightToolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";

import classes from "./ChatPage.module.css"

const ChatPage = (props) => {
    return (
        <div className={classes.ChatPage}>
            <LeftToolbar/>
            <SideDrawer/>
            <Chat/>
            <RightToolbar/>
        </div>
    )
}

export default ChatPage;