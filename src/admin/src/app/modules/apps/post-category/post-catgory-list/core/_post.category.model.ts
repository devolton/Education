import {ID} from "../../../../../../_metronic/helpers";

export type PostCategory ={
    id:ID,
    name:string,
    description:string,
    thumbnailPath:string
}
export type CreatePostCategoryDto={
    name:string,
    description:string,
    thumbnailPath:string;
}
export type UpdatePostCategoryDto={
    name:string,
    description:string
}

export const initialPostCategory:PostCategory={
    id:undefined,
    name:'',
    description:'',
    thumbnailPath:'/static/user/avatar/defaultAvatar.png' //change to default poster
}