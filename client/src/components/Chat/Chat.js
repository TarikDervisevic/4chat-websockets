import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header/Header";
import MessageList from "./MessageList/MessageList";
import NewMessage from "./NewMessage/NewMessage";
import MessageDataService from "../../services/messages";

import classes from "./Chat.module.css"

const Chat = (props) => {

    const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isGettingMessages, setIsGettingMessages] = useState(false);

    const messageListRef = useRef();

    const username = useSelector(state => state.username);
    const board = useSelector(state => state.board);
    const newestMessageID = useSelector(state => state.newestMessageID);
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
                    console.log(response.data);
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
                        dispatch({
                            type: "setNewestMessageID",
                            payload: {
                                newestMessageID: resHighestMessageID
                            }
                        })
                    }

                    messageListRef.current.scrollToPreResLastMessage()
                    setIsGettingMessages(false);
                }
            })
    }

    setInterval(() => {
        MessageDataService.getNewMessages(board, newestMessageID)
            .then((response) => {
                setMessages(prevState => {
                    return [ ...prevState, ...response.data ]
                })
                messageListRef.current.scrollToBottom();
                let resHighestMessageID = response.data[response.data.length - 1].postID;
                console.log(resHighestMessageID)
                if (resHighestMessageID > newestMessageID) {
                    dispatch({
                        type: "setNewestMessageID",
                        payload: {
                            newestMessageID: resHighestMessageID
                        }
                    })
                }
            })
    }, 20000000);

    useEffect(() => {
        let req = { 
            numRequestedMessages: 30, 
            lastMessageID: "first_query",
            board: board 
        }
        getMessages(req);
    }, [])

    useEffect(() => {
        console.log(lastMessageOffsetTop)
    }, [lastMessageOffsetTop])

    const scrollToTopHandler = (e) => {
        if (e.target.scrollTop < 80 && !isGettingMessages) {
            console.log("Scrolled to top of div")
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
            text: newMessage
        }
        MessageDataService.postMessage(board, message)
        .then(() => {
            MessageDataService.getNewMessages(board, newestMessageID)
            .then((response) => {
                setMessages(prevState => {
                    return [ ...prevState, ...response.data ]
                })
                messageListRef.current.scrollToBottom();
                let resHighestMessageID = response.data[response.data.length - 1].postID;
                console.log(resHighestMessageID)
                if (resHighestMessageID > newestMessageID) {
                    dispatch({
                        type: "setNewestMessageID",
                        payload: {
                            newestMessageID: resHighestMessageID
                        }
                    })
                }
            })
        })
        setNewMessage("");
    }

    return (
        <div className={classes.Chat}>
            <Header/>
            <MessageList 
                ref={messageListRef}
                messages={messages}
                onScrollToTop={scrollToTopHandler}
                setOffsetFromTop={setLastMessageOffsetTop}/>
            <NewMessage 
                setNewMessage={setNewMessage} 
                sendMessage={sendMessage} 
                newMessage={newMessage} />
        </div>
    )
}

export default Chat;
