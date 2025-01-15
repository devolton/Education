import api from "../http/core";

export class NavigationService {

    static async getNavigations(){
        return await api.get('/navigations');
    }
}