import {ID} from "../../../../../_metronic/helpers";
import axios, {AxiosResponse} from "axios";
import {Config} from "../../../../../env.config.ts";
import {ChatMessage} from "./_chat.model.ts";

const getUserMessages=(receiverId:ID)=>{
    return axios.get(Config.PATH.SERVER.CHAT_URL+`/${receiverId}`)
        .then((response:AxiosResponse<Array<ChatMessage>>) => {
          return response.data;
        });
}

export {
    getUserMessages,
}