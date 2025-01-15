import {ID} from "../../../../../../_metronic/helpers";


export enum MediaAssetCategoryEnum{
    LOGO='logo',
    BANNER='banner',
    POSTER='poster',
    ICON='icon'

}
export type MediaAsset={
    id:ID,
    name:string,
    path:string,
    alt:string,
    category:string,
}
export type CreateMediaAssetDto={
    name:string,
    path:string,
    alt:string,
    category:MediaAssetCategoryEnum
}
export type UpdateMediaAssetDto={
    alt:string
}
export const initialMediaAsset:MediaAsset={
    id:undefined,
    name:'poster',
    path:'',
    alt:'image',
    category:MediaAssetCategoryEnum.POSTER
}