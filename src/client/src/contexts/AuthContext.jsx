import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthService from "../service/auth.service";
import {UserService} from "../service/user.service";


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = (login, password) => {
        if(!login || !password) {
            console.log('Login or password can not be null!');
            return;
        }
        AuthService.login(login, password).then(res=>{
            if(res.status===201){
                console.log(res.data);
                let tokens=res.data.tokens;
                let userInfo = res.data.user;
                setIsAuthenticated(true);
                UserService.id=userInfo.id;
                UserService.login=userInfo.login;
                localStorage.setItem('token',tokens.accessToken);
                navigate('/');
            }
        }).catch((err)=>{
            console.log(err);
        })

    };

    const singIn=(name,surname,middlename, login, email, password, confirmPassword)=>{
        if(!name || !surname || !middlename || !login || !email || !password || !confirmPassword){
            console.log('Fields can not be null!')
            return ;
        }
        if(password !==confirmPassword){
            console.log("Password dont equals!");
            return;
        }
        AuthService.registration(name,surname,middlename,login,email,password)
            .then(res=>{
                if(res.status===201){
                    let tokens=res.data.tokens;
                    setIsAuthenticated(true);
                    localStorage.setItem('token',tokens.accessToken);
                    navigate('/');
                }
            }).catch(err=>{
                console.log(err);
        })

    }

    const logout = () => {
        AuthService.logout().then(res=>{
            if(res.status===200){
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        })
    };
    const checkAuth = ()=>{
        AuthService.checkAuth().then(res=>{
            if(res.status===200){
                localStorage.setItem('token',res.data.tokens.accessToken);
                let userInfo = res.data.user;
                UserService.id=userInfo.id;
                UserService.login=userInfo.login;
                setIsAuthenticated(true);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, singIn,checkAuth}}>
            {children}
        </AuthContext.Provider>
    );
};
