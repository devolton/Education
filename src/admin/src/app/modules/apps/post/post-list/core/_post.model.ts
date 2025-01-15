import {ID} from "../../../../../../_metronic/helpers";
import {PostTag} from "../../../post-tag/post-tag-list/core/_post.tag.model.ts";
import {PostCategory} from "../../../post-category/post-catgory-list/core/_post.category.model.ts";
import {Config} from "../../../../../../env.config.ts";
import {Author} from "../../../author/author-list/core/_author.model.ts";


export enum PostStatusEnum{
    CREATED='created',
    PUBLISHED='published',
    REJECTED='rejected'

}

export type BlogPost={
    id:ID,
    title:string,
    shortDescription:string,
    content:string,
    thumbnailPath:string,
    posterPath:string,
    imgAlt:string,
    slug:string,
    postInfoId:ID,
    postInfo?:BlogPostInfo,
    authorId:ID,
    author?:Author,
    tags?:PostTag[],
    categories?:PostCategory[]
}
export type BlogPostInfo={
    id:ID,
    viewsCount:number,
    dateOfCreated:Date,
    dateOfPublished:Date,
    status:PostStatusEnum
}


export type CreateBlogPostDto={
    title:string,
    shortDescription:string,
    content:string,
    thumbnailPath:string,
    posterPath:string,
    imgAlt:string,
    slug:string,
    authorId:ID,
    tagsIds?:Array<number>,
    categoriesIds?:Array<number>
}

export type UpdateBlogPostDto={
    title:string,
    shortDescription:string,
    content:string,
    imgAlt:string,
    slug:string,
    tagsIds?:Array<number>,
    categoriesIds?:Array<number>

}
export type UpdateBlogPostInfoDto={
    viewCount:number,
    status:PostStatusEnum

}
export type CreateBlogPostInfoDto={
    viewCount:number,
    status:PostStatusEnum,
    dateOfCreated:Date,
    dateOfPublished:Date
}
export const initialBlogPostInfo:BlogPostInfo={
    id:undefined,
    viewsCount:0,
    status:PostStatusEnum.CREATED,
    dateOfCreated:new Date(),
    dateOfPublished:new Date(),

}

export const initialBlogPost:BlogPost={
    id:undefined,
    title:'Devolton post',
    shortDescription:'Devolton post about IT',
    content:'',
    thumbnailPath:Config.PATH.ASSETS.BLOG.POST.DEFAULT_THUMBNAIL,
    posterPath:Config.PATH.ASSETS.BLOG.POST.DEFAULT_POSTER,
    imgAlt:'post',
    slug:'',
    postInfoId:undefined,
    authorId:undefined,
    postInfo: {
        ...initialBlogPostInfo
    }

}

