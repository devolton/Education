import axios from "axios";
import {CUSTOM_API_URL} from "../../../user-management/custom-users-list/core/_userRequests.ts";
import {ID} from "../../../../../../_metronic/helpers";
import {CreatePostTagDto, UpdatePostTagDto} from "./_post.tag.model.ts";


const getPostTags=(query)=>{
    return axios.get(`${CUSTOM_API_URL}/api/post-tags?${query}`)
        .then(res=>{
          return res.data;
        })
}
const getPostTagById=(id:ID)=>{
    return axios.get(`${CUSTOM_API_URL}/api/post-tags/${id}`)
        .then(res=>{
            return res.data;
        })
}
const removePostTagById=(id:ID)=>{
    return axios.delete(`${CUSTOM_API_URL}/api/post-tags/${id}`);

}
const updatePostTag=(id:ID, updatePostTagDto:UpdatePostTagDto)=>{
    return  axios.put(`${CUSTOM_API_URL}/api/post-tags/${id}`,{'tag':updatePostTagDto});
}
const removePostTags=(ids:ID[])=>{
    const request =ids.map((oneId)=> axios.delete(`${CUSTOM_API_URL}/api/post-tags/${oneId}`));
    return axios.all(request);
}


const createPostTag=(postTagDto:CreatePostTagDto)=>{
    return axios.post(`${CUSTOM_API_URL}/api/post-tags`,{tag:postTagDto});

}
export {
    getPostTags,
    getPostTagById,
    updatePostTag,
    createPostTag,
    removePostTagById,
    removePostTags
}