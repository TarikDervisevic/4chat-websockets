import http from "../http-common";

export default class MessageDataService {
    static async getXMessages(board = "general1", numMessagesRequested, lastMessageID) {
        return http.get(`/boards/${board}/${numMessagesRequested}/${lastMessageID}`)
    }
    static async postMessage(board = "general1", message) {
        return http.post(`/boards/${board}`, message)
    }
}