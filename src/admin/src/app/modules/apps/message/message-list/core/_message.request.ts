import axios from "axios";
import {Config} from "../../../../../../env.config.ts";
import {ID} from "../../../../../../_metronic/helpers";

const getMessages=(query)=>{
    return axios.get(Config.PATH.SERVER.MESSAGES_URL+`?${query}`)
        .then((res)=>{
            return res.data;
        })
}
const getMessageById=(id:ID)=>{
    return axios.get(Config.PATH.SERVER.MESSAGES_URL+`/${id}`)
        .then(res=>{
            return res.data;
        })
}
const changeMessageState=(id:ID)=>{
    return axios.put(Config.PATH.SERVER.MESSAGES_URL+`/set-replied-status/${id}`);
}
const removeMessageById=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.MESSAGES_URL+`/${id}`);
}
const removeMessages=(ids:Array<ID>)=>{
    let requests = ids.map(id=>axios.delete(Config.PATH.SERVER.MESSAGES_URL+`/${id}`));
    return axios.all(requests);
}

export {
    getMessageById,
    changeMessageState,
    getMessages,
    removeMessages,
    removeMessageById
}