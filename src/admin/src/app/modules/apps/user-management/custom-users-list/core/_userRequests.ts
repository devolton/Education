import axios, {AxiosResponse} from "axios";
import {ID} from "../../../../../../_metronic/helpers";
import {CreateCustomUserDto, CustomUser, UpdateCustomUserDto} from "./custom.user.model.ts";
import {IUpdateLogin} from "../../../../accounts/components/settings/SettingsModel.ts";
import {Config} from "../../../../../../env.config.ts";

const CUSTOM_API_URL = 'http://localhost:3001';


const getCustomUsers = (query: string) => {
    return axios.get(`${CUSTOM_API_URL}/api/users?${query}`)
        .then((r) => {
            return r.data;
        });
}
const getCustomUsersWithMessages=(senderId:number,query: string) => {
    return axios.get(`${CUSTOM_API_URL}/api/users/chat_messages/${senderId}?full_name=${query}`)
        .then((r)=>{
            return r.data;
        })

}
const updateCustomUser = (id: number, updateUserDto: UpdateCustomUserDto) => {
    return axios.put(`${CUSTOM_API_URL}/api/users/${id}`, {user: updateUserDto})
}
const updateCustomUserAvatar = (userId: ID, avatar: File) => {
    return axios.put(`${CUSTOM_API_URL}/api/users/avatar/${userId}`, {avatar: avatar}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

}
const getCustomUserById = (id: ID) => {
    return axios.get(`${CUSTOM_API_URL}/api/users/${id}`)
        .then((response: AxiosResponse<CustomUser>) => {
            return response.data;
        })
}
const removeCustomUser = (id: ID) => {
    return axios.delete(`${CUSTOM_API_URL}/api/users/${id}`);
}

const removeSelectedCustomUsers = (customUsersIds: Array<ID>) => {
    const responses = customUsersIds.map((oneId) => axios.delete(`${CUSTOM_API_URL}/api/users/${oneId}`));
    return axios.all(responses);

}
const removeCustomUserAvatar = (userId: ID) => {
    return axios.delete(`${CUSTOM_API_URL}/api/users/avatar/${userId}`);
}
const createCustomUser = (createCustomUserDto: CreateCustomUserDto, avatar: File) => {
    return axios.post(`${CUSTOM_API_URL}/api/users`, {user: createCustomUserDto, avatar: avatar}, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response: AxiosResponse<CustomUser>) => {
            return response.data;
        })

}

const getAllRoles = () => {
    return axios.get(`${CUSTOM_API_URL}/api/roles`)
        .then((res) => {
            return res.data;
        })

}
const removeRoleFromUser = (roleIds: number[], userId: ID) => {
    let requests = roleIds.map((oneRoleId) => axios.put(`${CUSTOM_API_URL}/api/users/role/${userId}`, {roleId: oneRoleId}));
    return axios.all(requests);

}
const updateCustomUserPassword=(userId:ID, updatePasswordObj)=>{
    return axios.put(`${CUSTOM_API_URL}/api/users/password/${userId}`,{upPassword:updatePasswordObj})
        .then(res=>res.data);

}
const updateCustomUserLogin=(userId:ID,updateLoginDto:IUpdateLogin)=>{
    return axios.put(`${CUSTOM_API_URL}/api/users/login/${userId}`,{upLogin:updateLoginDto})
        .then(res=>{
            return {
                status:res.status,
                data:res.data
            }
        })
}
const addRoleToUser = (roleIds: number[], userId: ID) => {
    let requests = roleIds.map(oneRoleId=>{axios.post(`${CUSTOM_API_URL}/api/users/role/${userId}`,{roleId:oneRoleId})});
    return axios.all(requests);
}

export {
    getCustomUsers,
    getCustomUserById,
    getCustomUsersWithMessages,
    updateCustomUser,
    createCustomUser,
    removeCustomUser,
    removeCustomUserAvatar,
    removeSelectedCustomUsers,
    removeRoleFromUser,
    addRoleToUser,
    updateCustomUserAvatar,
    updateCustomUserLogin,
    updateCustomUserPassword,
    getAllRoles,
    CUSTOM_API_URL
}
