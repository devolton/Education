import {ID} from "../../../../../../_metronic/helpers";

export type Option={
    id:ID,
    name:string,
    value:string,
    relation?:string

}

export type CreateOptionDto={
    name:string,
    value:string,
    relation?:string
}

export type UpdateOptionDto={
    name:string,
    value:string,
    relation?:string
}

export const initialOption:Option={
    id:undefined,
    name:'',
    value:'',
    relation:null
}

