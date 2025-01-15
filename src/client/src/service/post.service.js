import api from "../http/core";
import {PostFetchService} from "../tools/PostFetchService";

export class PostService{

    static async getRandomPostRange(limit){
        return await api.get(`/posts/random?limit=${limit}`)
    }
    static async getPostRange(){
      return await api.get(`/posts?limit=${PostFetchService.limit}&offset=${PostFetchService.offset}&query=${PostFetchService.query}`)
    }
    static async getFilteredPostRange(){
      return await api.get(`/posts?limit=${PostFetchService.limit}&offset=${PostFetchService.offset}&category=${PostFetchService.category}&tag=${PostFetchService.tag}&query=${PostFetchService.query}`)
    }
    static async getPostNeighbours(slug){
        return await api.get(`/posts/neighbours/${slug}`);
    }
    static async getPostBySlug(slug){
        return await api.get(`/posts/${slug}`);
    }
    static async getTopViewsPostRange(limit){
        return await api.get(`/posts/topViews?limit=${limit}`)
    }
    static async getPostCategories(limit){
        return (await api.get(`/post-categories/random?limit=${limit}`)).data;
    }
    static async getPostTags(limit){
        return (await api.get(`/post-tags?items_per_page=${limit}`)).data;
    }
}