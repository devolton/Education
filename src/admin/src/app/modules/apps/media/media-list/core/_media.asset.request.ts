import axios from "axios";
import {Config} from "../../../../../../env.config.ts";
import {ID} from "../../../../../../_metronic/helpers";
import {UpdateMediaAssetDto} from "./_media.asset.model.ts";

const getAllMediaAssets=(query)=>{
    return axios.get(Config.PATH.SERVER.MEDIA_ASSETS_URL+`?${query}`)
        .then(res=>{
            return res.data;
        })
}
const getMediaAssetById=(id:ID)=>{
    return axios.get(Config.PATH.SERVER.MEDIA_ASSETS_URL+`/${id}`)
        .then(res=>{
            return res.data;
        })
}

const updateMediaAsset=(id:ID,updateMediaAssetDto:UpdateMediaAssetDto)=>{
    return axios.put(Config.PATH.SERVER.MEDIA_ASSETS_URL+`/${id}`,{image_asset:updateMediaAssetDto});
}
const updateMediaAssetImage=(id:ID,image:File)=>{
    return axios.put(Config.PATH.SERVER.MEDIA_ASSETS_URL+`/image/${id}`,{image:image},{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
const removeMediaAssetImage=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.MEDIA_ASSETS_URL+`/image/${id}`);
}

export {
    getAllMediaAssets,
    getMediaAssetById,
    updateMediaAsset,
    updateMediaAssetImage,
    removeMediaAssetImage
}