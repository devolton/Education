import api from "../http/core";

export default class AuthService{
     static async login(login,password){
         let credentialsObj = {
             login: login,
             password: password
         };
         return await api.post('/auth/login',{user:credentialsObj});
    }
    static async registration(name,surname,middlename, login, email, password){

        const credentialObj={
            name:name,
            surname:surname,
            middleName:middlename,
            email:email,
            login:login,
            password:password,
            avatarPath:'/static/blog/c1.jpg'

        }
        return await api.post('/auth/registration',{user:credentialObj});

    }
    static async logout(){
         return await api.put('/auth/logout');
    }
    static async checkAuth(){
         return await api.put('/auth/refresh',{},{withCredentials:true});
    }

}