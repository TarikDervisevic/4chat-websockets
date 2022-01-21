import http from "../http-common";

export default class MessageDataService {
    static async getXMessages(board = "general1", numMessagesRequested, lastMessageID) {
        return http.get(`/boards/${board}/get_messages/${numMessagesRequested}/${lastMessageID}`)
    }
    static async getNewMessages(board = "general1", newestMessageID) {
        return http.get(`/boards/${board}/update_messages/${newestMessageID}`)
    }
    static async postMessage(board = "general1", message) {
        return http.post(`/boards/${board}`, message)
    }
}