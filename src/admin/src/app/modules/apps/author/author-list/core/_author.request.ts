import axios from "axios";
import {Config} from "../../../../../../env.config.ts";
import {ID} from "../../../../../../_metronic/helpers";
import {CreateAuthorDto, UpdateAuthorDto} from "./_author.model.ts";

const getAllAuthors=(query)=>{
    return axios.get(Config.PATH.SERVER.AUTHORS_URL+`?${query}`)
        .then(res=>{
            return res.data;
        })
}
const getAuthorById=(id:ID)=>{
    return axios.get(Config.PATH.SERVER.AUTHORS_URL+`/${id}`)
        .then(res=>{
            return res.data;
        })
};
const createAuthor =(createAuthorDto:CreateAuthorDto, avatar:File=null)=>{
    return axios.post(Config.PATH.SERVER.AUTHORS_URL,{author:createAuthorDto,avatar:avatar},{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })

}
const updateAuthor=(id:ID,updateAuthorDto:UpdateAuthorDto)=>{
    return axios.put(Config.PATH.SERVER.AUTHORS_URL+`/${id}`,{author:updateAuthorDto});
}
const updateAuthorAvatar=(id:ID,avatar:File)=>{
    return axios.put(Config.PATH.SERVER.AUTHORS_URL+`/avatar/${id}`,{avatar:avatar},{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
const removeAuthorById=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.AUTHORS_URL+`/${id}`);
}
const removeAuthors=(ids:Array<ID>)=>{
    let requests = ids.map(id=>axios.delete(Config.PATH.SERVER.AUTHORS_URL+`/${id}`));
    return axios.all(requests);

}
const removeAuthorAvatar=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.AUTHORS_URL+`/avatar/${id}`);
}

export {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthorAvatar,
    updateAuthor,
    removeAuthors,
    removeAuthorAvatar,
    removeAuthorById
}