import {ID} from "../../../../../_metronic/helpers";
import {CustomUser} from "../../user-management/custom-users-list/core/custom.user.model.ts";

export type ChatMessage = {
    id:ID,
    message: string,
    parentMessageId?:ID,
    parentMessage?:ChatMessage,
    sender?:CustomUser,
    senderId:ID,
    receiver?:CustomUser,
    receiverId:ID,
    isRead?:boolean,
    createdAt?:Date,
    updatedAt?:Date
}
export type UpdateChatMessageDto={
    message:string,
    isRead:boolean,
    updatedAt?:Date
}
export interface ChatMessageModel {
    id:number,
    sender:CustomUser,
    receiver:CustomUser,
    isRead:boolean,
    type: 'in' | 'out'
    text: string
    time: string
}