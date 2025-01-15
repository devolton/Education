import axios from "axios";
import {Config} from "../../../../../../env.config.ts";
import {ID} from "../../../../../../_metronic/helpers";
import {CreateNavigationDto, UpdateNavigationDto} from "./_navigation.model.ts";

const getNavigations=(query)=>{
    return axios.get(Config.PATH.SERVER.NAVIGATIONS_URL+`/admin?${query}`)
        .then(res=>{
            return res.data;
        })
}
const getNavigationById=(id:ID)=>{
    return axios.get(Config.PATH.SERVER.NAVIGATIONS_URL+`/${id}`)
        .then(res=>{
            return res.data;
        })
}
const updateNavigation=(id:ID, updateNavigationDto:UpdateNavigationDto)=>{
    return axios.put(Config.PATH.SERVER.NAVIGATIONS_URL+`/${id}`,{navigation:updateNavigationDto})
        .then(res=>{
            return res.data;
        })
}
const createNavigation=(createNavigationDto:CreateNavigationDto)=>{
    return axios.post(Config.PATH.SERVER.NAVIGATIONS_URL,{navigation:createNavigationDto});
}
const removeNavigationById=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.NAVIGATIONS_URL+`/${id}`);
}
const removeNavigations=(ids:Array<ID>)=>{
    const requests = ids.map(id=>axios.delete(Config.PATH.SERVER.NAVIGATIONS_URL+`/${id}`));
    return axios.all(requests);
}

export {
    getNavigations,
    getNavigationById,
    createNavigation,
    updateNavigation,
    removeNavigations,
    removeNavigationById
}