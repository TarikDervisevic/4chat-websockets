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
    const [newestMessageID, setNewestMessageID] = useState(0);
    const [messageListScrollHeight, setMessageListScrollHeight] = useState(1000);
    const [messageListScrollTop, setMessageListScrollTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);

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

    const updateMessages = (isAutoUpdate = false) => {
        let isScrolledToBottom = (messageListScrollHeight - messageListScrollTop === clientHeight)
        MessageDataService.getNewMessages(board, newestMessageID)
            .then((response) => {
                setMessages(prevState => {
                    let newMessages = response.data;
                    let newMessageIDs = [];
                    let oldMessageIDs = [];
                    prevState.forEach(message => {
                        oldMessageIDs.push(message.postID);
                    })
                    newMessages.forEach(message => {
                        newMessageIDs.push(message.postID);
                    });
                    newMessageIDs.forEach(ID => {
                        if (oldMessageIDs.includes(ID)) {
                            const index = newMessageIDs.indexOf(ID);
                            newMessageIDs.splice(index);
                        }
                    })
                    newMessages.forEach(message => {
                        if (oldMessageIDs.includes(message.postID)) {
                            let index = newMessages.indexOf(message);
                            newMessages.splice(index);
                        }
                    })
                    return [ ...prevState, ...newMessages ]
                })
                if (!isAutoUpdate || isScrolledToBottom) { 
                    messageListRef.current.scrollToBottom(); 
                }
                
                let resHighestMessageID;
                if (response.data.length) {
                    resHighestMessageID = response.data[response.data.length - 1].postID;
                } else {
                    resHighestMessageID = 0;
                }
                if (resHighestMessageID > newestMessageID) {
                    setNewestMessageID(resHighestMessageID);
                }
            })
    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
            savedCallback.current();
            }
            if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
            }
        }, [delay]);
    }

    useInterval(() => {
        updateMessages(true)
    }, 2000);

    useEffect(() => {
        let req = { 
            numRequestedMessages: 30, 
            lastMessageID: "first_query",
            board: board 
        }
        getMessages(req);
    }, [])

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
        MessageDataService.postMessage(board, message)
        .then(() => {
            updateMessages();
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

