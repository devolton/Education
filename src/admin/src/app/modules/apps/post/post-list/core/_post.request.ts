import axios from "axios";

import {CreateBlogPostDto, CreateBlogPostInfoDto, UpdateBlogPostDto, UpdateBlogPostInfoDto} from "./_post.model.ts";
import {Config} from "../../../../../../env.config.ts";
import {ID, isNotEmpty} from "../../../../../../_metronic/helpers";

const getPosts = (query) => {
    return axios.get(Config.PATH.SERVER.POSTS_URL + `/admin?${query}`)
        .then(res => {
            return res.data;
        })
}
const getPostById = (id: ID) => {
    return axios.get(`${Config.PATH.SERVER.POSTS_URL}/byId/${id}`)
        .then(res => {
            return res.data;
        })
}
const createPost = (createPostDto: CreateBlogPostDto, createPostInfoDto: CreateBlogPostInfoDto, poster: File = null, thumbnail: File = null) => {

    return axios.post(Config.PATH.SERVER.POSTS_URL, {post:createPostDto,post_info:createPostInfoDto})
        .then(res=>{
            if(isNotEmpty(res.data)){
                let postId = res.data.id;
                if(postId){
                    if(poster){
                         updatePostPoster(postId,poster);
                    }
                    if(thumbnail)
                        updatePostThumbnail(postId,thumbnail);
                }
            }
        })
}
const updatePost = (id: ID, updatePostDto: UpdateBlogPostDto, updatePostInfoDto: UpdateBlogPostInfoDto) => {
    return axios.put(Config.PATH.SERVER.POSTS_URL + `/${id}`, {
        post: updatePostDto,
        post_info: updatePostInfoDto
    });
}
const updatePostThumbnail = (id: ID, thumbnail: File) => {
    return axios.put(Config.PATH.SERVER.POSTS_URL + `/thumbnail/${id}`, {thumbnail: thumbnail}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
const updatePostPoster = (id: ID, poster: File) => {
    return axios.put(Config.PATH.SERVER.POSTS_URL + `/poster/${id}`, {poster: poster}, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
const removePost = (id: ID) => {
    return axios.delete(Config.PATH.SERVER.POSTS_URL + `/${id}`);
}
const removeManyPost = (ids: Array<ID>) => {
    const requests = ids.map((id) => axios.delete(Config.PATH.SERVER.POSTS_URL + `/${id}`));
    return axios.all(requests);
}
const removePostThumbnail = (id: ID) => {
    return axios.delete(Config.PATH.SERVER.POSTS_URL + `/thumbnail/${id}`);
}
const removePostPoster = (id: ID) => {
    return axios.delete(Config.PATH.SERVER.POSTS_URL + `/poster/${id}`);
}


export {
    getPosts,
    getPostById,
    createPost,
    updatePostThumbnail,
    updatePostPoster,
    updatePost,
    removePostThumbnail,
    removePostPoster,
    removeManyPost,
    removePost

}