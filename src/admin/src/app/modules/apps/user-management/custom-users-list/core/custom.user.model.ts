import {CustomResponse, ID, Response} from "../../../../../../_metronic/helpers";
import {Role} from "../../../role/role-list/core/_role.model.ts";
import {ChatMessage} from "../../../chat/core/_chat.model.ts";


export type CustomUser = {
    id: ID,
    createAt?:Date,
    updateAt?:Date,
    name:string,
    surname:string,
    middleName:string,
    login:string,
    email:string,
    avatarPath:string,
    password:string,
    reviews?:[],
    roles?:Role[],
    sentMessages?: Array<ChatMessage>,
    receivedMessages?: Array<ChatMessage>,

}
export type UpdateCustomUserDto={
    name:string,
    surname:string,
    middleName:string,
    login:string;
    password?:string;

}
export type CreateCustomUserDto={
    name:string;
    surname:string,
    middleName:string,
    login:string,
    email:string,
    avatarPath:string,
    password:string,
}

export const initialCustomUser:CustomUser={
    id:undefined,
    name:'',
    surname:'',
    middleName:'',
    password:'',
    login:'',
    email:'',
    avatarPath:'/static/user/avatar/defaultAvatar.png'
}
export type CustomUserQueryResponse = CustomResponse<Array<CustomUser>>
