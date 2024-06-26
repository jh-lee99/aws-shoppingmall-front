import axios, { AxiosError } from 'axios'; // AxiosError 타입 추가
import { store } from '../redux/store';
import { jwtUtils } from "./JwtUtils";

const instance = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? '' : 'https://api.eastflag.co.kr'
  baseURL: process.env.NODE_ENV === 'production' ? '' : ''
})

/**
    1. 요청 인터셉터
    2개의 콜백 함수를 받습니다.
*/
instance.interceptors.request.use(
  (config) => {
    // 요청 성공 직전 호출됩니다.
    // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
    const token = store.getState().Auth?.token;
    try {
      if (token && jwtUtils.isAuth(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (err: any) {
      console.error('[_axios.interceptors.request] config : ' + err.message);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

/**
    2. 응답 인터셉터
    2개의 콜백 함수를 받습니다.
*/
instance.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */

    return response;
  },

  (error: AxiosError) => { // error 변수의 타입을 AxiosError로 명시
    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.
    */
    return Promise.reject(error);
  }
);

export default instance;
