import {ID} from "../../../../../_metronic/helpers";
import axios, {AxiosResponse} from "axios";
import {Config} from "../../../../../env.config.ts";
import {ChatMessage, UpdateChatMessageDto} from "./_chat.model.ts";

const getUserMessages=(receiverId:ID)=>{
    return axios.get(Config.PATH.SERVER.CHAT_URL+`/${receiverId}`)
        .then((response:AxiosResponse<Array<ChatMessage>>) => {
          return response.data;
        });
}
const getLastReceiverMessage = (receiverId: ID) => {
    return axios.get(Config.PATH.SERVER.CHAT_URL + `/last/${receiverId}`)
        .then((response: AxiosResponse<ChatMessage>) => {
            return response.data;
        })
}
const getUnreadReceiverMessagesCount =(receiverId:ID)=>{
    return axios.get(Config.PATH.SERVER.CHAT_URL+`/unread/${receiverId}`)
        .then((response:AxiosResponse<number>)=>{
            return response.data;
        })
}
const updateMessageById=(messageId:ID,updateChatMessageDto:UpdateChatMessageDto)=>{
    return axios.put(Config.PATH.SERVER.CHAT_URL+`/${messageId}`,{message:updateChatMessageDto})
        .then((response:AxiosResponse<ChatMessage>) => {
            return response.data;
        })
}
const setChatMessageReadState=(messageId:ID)=>{
    return axios.put(Config.PATH.SERVER.CHAT_URL+`/set-read/${messageId}`)
        .then((response:AxiosResponse<ChatMessage>) => {
            return response.data;
        })
}

export {
    getUserMessages,
    getLastReceiverMessage,
    getUnreadReceiverMessagesCount,
    updateMessageById,
    setChatMessageReadState,

}