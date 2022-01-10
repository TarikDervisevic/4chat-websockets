import { createStore } from "redux";

const mainReducer = (state = { 
        username: "Anonymous",
        showSideDrawer: false,
    }, action ) => {
    switch (action.type) {
        case "flash": return { ...state, flashMessage: action.payload.flashMessage, flashType: action.payload.flashType } || state;
        case "setUsername": return { ...state, username: action.payload.username } || state;
        case "setShowSideDrawer": return { ...state, showSideDrawer: !state.showSideDrawer } || state;
        default: return state;
    }
};

const store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;