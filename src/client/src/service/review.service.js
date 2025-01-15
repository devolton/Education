import api from "../http/core";

export default class ReviewService{

    static async postReview(review){
        return await api.post('/reviews',{review});
    }
    static async getRandomReviewsRange(limit){
        return await api.get(`/reviews/random?limit=${limit}`)
    }
}