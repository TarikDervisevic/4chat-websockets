import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Header from "./Header/Header";
import MessageList from "./MessageList/MessageList";
import NewMessage from "./NewMessage/NewMessage";
import MessageDataService from "../../services/messages";

import classes from "./Chat.module.css"

const socket = io.connect(process.env.WEBSOCKET_SERVER_URL || "http://localhost:4000");

const Chat = (props) => {

    const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isGettingMessages, setIsGettingMessages] = useState(false);
    const [newestMessageID, setNewestMessageID] = useState(0);
    const [messageListScrollHeight, setMessageListScrollHeight] = useState(1000);
    const [messageListScrollTop, setMessageListScrollTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

    const messageListRef = useRef();

    const username = useSelector(state => state.username);
    const board = useSelector(state => state.currentBoard);
    const lastMessageID = useSelector(state => state.lastMessageID);
    const lastMessageOffsetTop = useSelector(state => state.lastMessageOffsetTop);

    const setLastMessageOffsetTop = (lastMessageOffsetTop) => {
        dispatch({
            type: "setLastMessageOffsetTop",
            payload: {
                lastMessageOffsetTop: lastMessageOffsetTop
            }
        })
    }

    const getMessages = (req) => {
        MessageDataService.getXMessages(req.board, req.numRequestedMessages, req.lastMessageID)
            .then((response) => {
                if (response.data.length) {
                    setMessages(prevState => { 
                        return [ ...response.data, ...prevState ]
                    }); 
                    let lastID = response.data[0].postID;
                    let resHighestMessageID = response.data[response.data.length - 1].postID;

                    dispatch({
                        type: "setPreResLastMessageID",
                        payload: {
                            preResLastMessageID: lastMessageID
                        }
                    })

                    dispatch({
                        type: "setLastMessageID",
                        payload: {
                            lastID
                        }
                    })

                    if (resHighestMessageID > newestMessageID) {
                        setNewestMessageID(resHighestMessageID);
                    }

                    messageListRef.current.scrollToPreResLastMessage()
                    setIsGettingMessages(false);
                }
            })
    }

    useEffect(() => {
        let req = { 
            numRequestedMessages: 30, 
            lastMessageID: "first_query",
            board: board 
        }
        getMessages(req);
    }, [])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages(prevState => {
                return [ ...prevState, data ]
            })
        })
    }, [socket])

    useEffect(() => {
        setIsScrolledToBottom(messageListScrollHeight - messageListScrollTop === clientHeight);
    }, [messageListScrollHeight, messageListScrollTop, clientHeight])

    useEffect(() => {
        if (isScrolledToBottom) { 
            messageListRef.current.scrollToBottom(); 
        }
    }, [messages])

    const scrollToTopHandler = (e) => {
        if (e.target.scrollTop < 80 && !isGettingMessages) {
            setIsGettingMessages(true);
            let req = {
                numRequestedMessages: 30,
                lastMessageID: lastMessageID,
                board: board
            }
            getMessages(req);
        }
    }

    const sendMessage = (e) => {
        let message = {
            username,
            text: newMessage,
            board: board
        }
        socket.emit("send_message", message);
        setNewMessage("");
    }

    return (
        <div className={classes.Chat}>
            <Header/>
            <MessageList 
                ref={messageListRef}
                messages={messages}
                onScrollToTop={scrollToTopHandler}
                setOffsetFromTop={setLastMessageOffsetTop}
                setMessageListScrollHeight={setMessageListScrollHeight}
                setMessageListScrollTop={setMessageListScrollTop}
                setClientHeight={setClientHeight}/>
            <NewMessage 
                setNewMessage={setNewMessage} 
                sendMessage={sendMessage} 
                newMessage={newMessage} />
        </div>
    )
}

export default Chat;

