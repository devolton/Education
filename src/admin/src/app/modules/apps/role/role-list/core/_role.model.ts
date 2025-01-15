import {ID} from "../../../../../../_metronic/helpers";

export type Role={
    id:ID
    value:string,
    description:string

}
export type CreateRoleDto={
    value:string,
    description:string;
}
export type UpdateRoleDto={
    value:string,
    description:string;
}
export  const initialRole={
    id:undefined,
    value:'',
    description:''
}