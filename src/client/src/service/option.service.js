import api from "../http/core";

export class OptionService{
     static async getSocialLinkOptions(){
         return await api.get(`/options/relation/social-link`);
     }
     static async getContactInfoOptions(){
         return await api.get(`/options/relation/contact-info`)
     }
}