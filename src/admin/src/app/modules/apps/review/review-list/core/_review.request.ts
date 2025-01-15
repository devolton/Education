import axios from "axios";
import {Config} from "../../../../../../env.config.ts";
import {ID} from "../../../../../../_metronic/helpers";

const getAllReviews=(query)=>{
    return axios.get(Config.PATH.SERVER.REVIEWS_URL+`/for-admin?${query}`)
        .then(res=>{
            return res.data;
        })
}

const removeReviewById=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.REVIEWS_URL+`/${id}`);
}

const removeReviews=(ids:Array<ID>)=>{
    const requests = ids.map(id=>axios.delete(Config.PATH.SERVER.REVIEWS_URL+`/${id}`))
    return axios.all(requests);
}

export {
    getAllReviews,
    removeReviews,
    removeReviewById
}