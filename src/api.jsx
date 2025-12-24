import axios from 'axios';

const apiURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: apiURL,
    withCredentials: true, //쿠키 챙겨보내기
});

api.defaults.headers.common['Content-Type'] = 'application/json'
export default api;

