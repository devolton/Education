/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthModel, MyAuthModel} from './_models'
import {CUSTOM_API_URL} from "../../apps/user-management/custom-users-list/core/_userRequests.ts";

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'
const ACCESS_TOKEN_KEY = "token";
const getAuth = (): MyAuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const accessToken: string | null = localStorage.getItem(ACCESS_TOKEN_KEY)

  if (!accessToken) {
    return
  }

  try {
    const auth: MyAuthModel = {
      accessToken:accessToken,
      refreshToken:null
    }
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: MyAuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    const accessToken = auth.accessToken;
    localStorage.setItem(ACCESS_TOKEN_KEY,accessToken);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, accessToken)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config) => {
      const auth = getAuth()
      if (auth && auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`
      }
      config.withCredentials=true;
      return config;
    },
    (err: any) => Promise.reject(err)
  );
  let _isRetry=false
  axios.interceptors.response.use(config => {
    return config;
  }, async (error) => {
    const originalReq = error.config;

    if (error.response.status === 401 && !_isRetry) {
      _isRetry=true;
      const response = await axios.put(`${CUSTOM_API_URL}/api/auth/refresh`, {}, {
        withCredentials: true
      })
      localStorage.setItem('token', response.data.tokens.accessToken);
      return axios.request(originalReq);
    }
  })
}

export {getAuth, setAuth, removeAuth,ACCESS_TOKEN_KEY, AUTH_LOCAL_STORAGE_KEY}
