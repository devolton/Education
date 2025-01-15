import {CUSTOM_API_URL} from "../../../user-management/custom-users-list/core/_userRequests.ts";
import axios from "axios";
import {CreatePostCategoryDto, UpdatePostCategoryDto} from "./_post.category.model.ts";
import {ID} from "../../../../../../_metronic/helpers";

const getAllCategory=(query)=>{
    return axios.get(`${CUSTOM_API_URL}/api/post-categories?${query}`)
        .then(res=>{
            return res.data;
        });
}
const createCategory=(createCategoryDto:CreatePostCategoryDto,image:File)=>{
    return axios.post(`${CUSTOM_API_URL}/api/post-categories`,{category:createCategoryDto,thumbnail:image},{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
const getCategoryById=(id:ID)=>{
    return axios.get(`${CUSTOM_API_URL}/api/post-categories/${id}`)
        .then(res=>{
            return res.data;
        })
}
const updateCategory=(id:ID,updatePostCategoryDto:UpdatePostCategoryDto)=>{
    return axios.put(`${CUSTOM_API_URL}/api/post-categories/${id}`,{'category':updatePostCategoryDto});
}
const updateThumbnailOfCategory = (id:ID,image:File)=>{
    console.log("IM REQUEST UPDATE THUMBNAIL FUNCTION")
    console.log(image.size);
    return axios.put(`${CUSTOM_API_URL}/api/post-categories/thumbnail/${id}`,{thumbnail:image},{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
const removeCategory=(id:ID)=>{
    return axios.delete(`${CUSTOM_API_URL}/api/post-categories/${id}`);
}
const removeCategories=(ids:ID[])=>{
    const request= ids.map(oneId=>axios.delete(`${CUSTOM_API_URL}/api/post-categories/${oneId}`));
    return axios.all(request);
}
const removeThumbnail=(id:ID)=>{
    return axios.delete(`${CUSTOM_API_URL}/api/post-categories/thumbnail/${id}`);
}

export {
    getCategoryById,
    getAllCategory,
    createCategory,
    updateCategory,
    updateThumbnailOfCategory,
    removeThumbnail,
    removeCategories,
    removeCategory

}