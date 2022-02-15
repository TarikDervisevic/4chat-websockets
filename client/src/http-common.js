import axios from "axios";

const setBaseURL = () => {
    if (process.env.NODE_ENV === "production") {
        return "https://four-chat-socket.herokuapp.com/api/"
    } else if (process.env.NODE_ENV !== "production") {
        return "http://localhost:8080/api/"
    }
}

const baseURL = setBaseURL();

export default axios.create({
    baseURL: baseURL,
    headers: { 
        "Content-type": "application/json"
    }
});