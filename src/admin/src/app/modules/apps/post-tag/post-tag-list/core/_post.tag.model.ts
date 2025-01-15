import {ID} from "../../../../../../_metronic/helpers";

export type PostTag={
    id:ID,
    name:string;
}
export type CreatePostTagDto = {
    name:string;
}
export type UpdatePostTagDto={
    name:string;

}
export const initialPostTag:PostTag={
    id:undefined,
    name:''

}