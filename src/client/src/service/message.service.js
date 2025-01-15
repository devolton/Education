import api from "../http/core";

export class MessageService{
    static async postMessage(message){
        return await api.post('/messages',message);
    }
}