import axios from 'axios';

const apiURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: apiURL,
    withCredentials: true, //쿠키 챙겨보내기
});

// ★ 요청 인터셉터 추가
api.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰을 가져옵니다. (저장하신 키 이름 확인 필요)
        const token = localStorage.getItem("accessToken"); 
        
        if (token) {
            // 헤더에 Bearer 토큰 추가
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.defaults.headers.common['Content-Type'] = 'application/json';

api.defaults.headers.common['Content-Type'] = 'application/json'
export default api;

