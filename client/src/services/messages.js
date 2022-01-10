import http from "../http-common";

export default class MessageDataService {
    static async getMessages(board = "general") {
        return http.get(`/${board}/messages`)
    }
    static async postMessage(board = "general") {
        return http.post(`/${board}/messages`)
    }
}