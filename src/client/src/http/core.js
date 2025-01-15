import axios from 'axios'
import Config from "../config";


const api = axios.create({
    withCredentials: true,
    baseURL: Config.SERVER.BASE_URL
})
api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});
let _isRetry = false;
api.interceptors.response.use(config => {
    return config;
}, async (error) => {
    const originalReq = error.config;
    if (error.response.status === 401 && !_isRetry) {
        _isRetry= true;
        const response = await axios.put(`${Config.SERVER.BASE_URL}/auth/refresh`, {}, {
            withCredentials: true
        })
        localStorage.setItem('token', response.data.tokens.accessToken);
        return api.request(originalReq);
    }
})
export default api;