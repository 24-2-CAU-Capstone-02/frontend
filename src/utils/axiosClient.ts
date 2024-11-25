import axios from 'axios';

// Axios 인스턴스 생성
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com', // 환경 변수로 기본 URL 설정
    timeout: 10000, // 요청 타임아웃 10초
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
axiosClient.interceptors.request.use(
    (config) => {
        // 토큰이 필요한 경우 추가
        const token = localStorage.getItem('sessionToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 요청 오류 처리
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosClient.interceptors.response.use(
    (response) => {
        // 성공적인 응답 처리
        return response.data;
    },
    (error) => {
        // 에러 응답 처리
        if (error.response) {
            // 서버에서 반환된 에러
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            // 요청이 전송되었으나 응답이 없는 경우
            console.error('No response received:', error.request);
        } else {
            // 요청 설정 중 오류
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
