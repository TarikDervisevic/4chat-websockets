import { createStore } from "redux";

const mainReducer = (state = { 
        username: "Anonymous",
        showSideDrawer: false,
        currentBoard: "general1",
        newestMessageID: 1,
        lastMessageID: 0,
        preResLastMessageID: 0,
        lastMessageOffsetTop: 0,
        screenSize: "large",
    }, action ) => {
    switch (action.type) {
        case "flash": return { ...state, flashMessage: action.payload.flashMessage, flashType: action.payload.flashType } || state;
        case "setBoard": return { ...state, board: action.payload.board } || state;
        case "setUsername": return { ...state, username: action.payload.username } || state;
        case "setLastMessageID": return { ...state, lastMessageID: action.payload.lastID } || state;
        case "setNewestMessageID": return { ...state, newestMessageID: action.payload.newestMessageID } || state;
        case "setPreResLastMessageID": return { ...state, preResLastMessageID: action.payload.preResLastMessageID } || state;
        case "setLastMessageOffsetTop": return { ...state, lastMessageOffsetTop: action.payload.lastMessageOffsetTop } || state;
        case "setShowSideDrawer": return { ...state, showSideDrawer: !state.showSideDrawer } || state;
        case "setScreenSize": return { ...state, screenSize: action.payload.screenSize } || state;
        default: return state;
    }
};

const store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;