/* eslint-disable react-refresh/only-export-components */
import {FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {MyAuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getCustomUserByToken, getUserByToken} from './_requests'
import {QUERIES, WithChildren} from '../../../../_metronic/helpers'
import {CustomUser, initialCustomUser} from "../../apps/user-management/custom-users-list/core/custom.user.model.ts";
import {
    CUSTOM_API_URL, getCustomUsers
} from "../../apps/user-management/custom-users-list/core/_userRequests.ts";
import axios from "axios";
import {useQuery} from "react-query";

type AuthContextProps = {
    auth: MyAuthModel | undefined
    refetch: () => void,
    // response: any,
    saveAuth: (auth: MyAuthModel | undefined) => void
    currentUser: UserModel | undefined
    currentCustomUser: CustomUser | undefined
    setCurrentCustomUser: Dispatch<SetStateAction<CustomUser | undefined>>
    setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
    logout: () => void
}

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    // response: initialCustomUser,
    saveAuth: () => {
    },
    refetch: () => {
    },
    currentUser: undefined,
    currentCustomUser: undefined,
    setCurrentCustomUser: () => {
    },
    setCurrentUser: () => {
    },
    logout: () => {
    }
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
    return useContext(AuthContext)
}





const AuthProvider: FC<WithChildren> = ({children}) => {
    const [auth, setAuth] = useState<MyAuthModel | undefined>(authHelper.getAuth())
    const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
    const [currentCustomUser, setCurrentCustomUser] = useState<CustomUser | undefined>();
    const {
        isFetching, refetch, data: response
    } = useQuery(
        `${QUERIES.ONE_USER}`,
        async() => {
            if(currentCustomUser) {
                let res = await getCustomUserByToken();
                setCurrentCustomUser(res);
            }
            return null;

        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )
    const saveAuth = (auth: MyAuthModel | undefined) => {
        setAuth(auth)
        if (auth) {
            authHelper.setAuth(auth)
        } else {
            authHelper.removeAuth()
        }
    }


    const logout = () => {
        saveAuth(undefined)
        setCurrentCustomUser(undefined)

    }

    return (
        <AuthContext.Provider
            value={{auth,currentCustomUser,refetch,setCurrentCustomUser, saveAuth, currentUser, setCurrentUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthInit: FC<WithChildren> = ({children}) => {
    const {auth,currentCustomUser,setCurrentCustomUser, logout,} = useAuth();
    const [showSplashScreen, setShowSplashScreen] = useState(true)

    // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
    useEffect(() => {
        const requestUser = async (apiToken: string) => {
            try {
                if (!currentCustomUser) {
                    const data= await getCustomUserByToken()
                    if (data) {
                        setCurrentCustomUser(data)
                    }
                    else{
                        console.log("data is empty");
                    }
                }
            } catch (error) {
                console.error(error)
                if (currentCustomUser) {
                    logout()
                }
            } finally {
                setShowSplashScreen(false)
            }
        }

        if (auth && auth.accessToken) {
            requestUser(auth.accessToken)
        } else {
            logout()
            setShowSplashScreen(false)
        }
        // eslint-disable-next-line
    }, [])

    return showSplashScreen ? <LayoutSplashScreen/> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
