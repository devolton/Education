import axios from "axios";
import {CUSTOM_API_URL} from "../../../user-management/custom-users-list/core/_userRequests.ts";
import {CreateRoleDto, UpdateRoleDto} from "./_role.model.ts";
import {ID} from "../../../../../../_metronic/helpers";

const getAllRole=(query)=>{
    return axios.get(`${CUSTOM_API_URL}/api/roles?${query}`)
        .then(res=>{
            return res.data;
        })
}
const getRoleById=(id:ID)=>{
    return axios.get(`${CUSTOM_API_URL}/api/roles/${id}`)
        .then(res=>{
            return res.data ;
        })
}

const createRole=(createRoleDto:CreateRoleDto)=>{
    return axios.post(`${CUSTOM_API_URL}/api/roles`,{role:createRoleDto})
}
const updateRole=(id:ID,updateRoleDto:UpdateRoleDto)=>{
    return axios.put(`${CUSTOM_API_URL}/api/roles/${id}`,{role:updateRoleDto});
}
const removeRole=(id:ID)=>{
    return axios.delete(`${CUSTOM_API_URL}/api/roles/${id}`);
}
const removeManyRoles=(ids:ID[])=>{
    let requests = ids.map(oneId=>axios.delete(`${CUSTOM_API_URL}/api/roles/${oneId}`));
    return axios.all(requests);
}


export {
    getAllRole,
    getRoleById,
    createRole,
    updateRole,
    removeManyRoles,
    removeRole
}