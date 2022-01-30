import React from "react";
import { useSelector } from "react-redux";
import Chat from "../../components/Chat/Chat";
import LeftToolbar from "../../components/Toolbars/LeftToolbar/LeftToolbar";
import RightToolbar from "../../components/Toolbars/RightToolbar/RightToolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";

import classes from "./ChatPage.module.css"

const ChatPage = (props) => {
    const screenSize = useSelector(state => state.screenSize);

    return (
        <div className={`${classes.ChatPage} ${screenSize !== "large" ? classes.ChatPageSmall : null}`}>
            {screenSize === "large" ? <LeftToolbar/> : null}
            <SideDrawer/>
            <Chat/>
            {screenSize === "large" ? <RightToolbar/> : null}
        </div>
    )
}

export default ChatPage;