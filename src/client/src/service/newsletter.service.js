import api from "../http/core";

export class NewsletterService{

    static async subscribe(email){
        return await api.post('/newsletters',email)
    }
}