import {CUSTOM_API_URL} from "../../../user-management/custom-users-list/core/_userRequests.ts";
import axios from "axios";
import {ID} from "../../../../../../_metronic/helpers";
import {CreateOptionDto, UpdateOptionDto} from "./_option.model.ts";

const getAllOptions=(query)=>{
    return axios.get(`${CUSTOM_API_URL}/api/options?${query}`)
        .then(res=>{
            return res.data;
        })
}
const getOptionById=(id:ID)=>{
    return axios.get(`${CUSTOM_API_URL}/api/options/${id}`).
        then(res=>{
            return res.data;
    })
}
const removeOption=(id:ID)=>{
    return axios.delete(`${CUSTOM_API_URL}/api/options/${id}`);
}
const removeSelectedOptions=(selectedOptionsIds: Array<ID>)=>{
    let requests = selectedOptionsIds.map((oneId)=>axios.delete(`${CUSTOM_API_URL}/api/options/${oneId}`));
    return axios.all(requests);
}
const createOption=(option:CreateOptionDto)=>{
    return axios.post(`${CUSTOM_API_URL}/api/options`,{option:option});
}
const updateOption =(id:ID,option:UpdateOptionDto)=>{
    return axios.put(`${CUSTOM_API_URL}/api/options/${id}`,{option:option});
}

export {
    getAllOptions,
    getOptionById,
    createOption,
    updateOption,
    removeOption,
    removeSelectedOptions
}