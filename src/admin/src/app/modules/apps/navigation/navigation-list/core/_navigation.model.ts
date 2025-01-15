import {ID} from "../../../../../../_metronic/helpers";

export type Navigation={
    id:ID,
    href:string,
    title:string,
    order:number,
    parentId?:number
}

export type CreateNavigationDto={
    href:string,
    title:string,
    order:number,
    parentId?:number
}
export type UpdateNavigationDto={
    href:string,
    title:string,
    order:number,
    parentId?:number
}

export const initialNavigation:Navigation={
    id:undefined,
    href:'/',
    title:'home',
    order:1,
    parentId:null
}