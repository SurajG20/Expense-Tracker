import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v1';

export const publicRequest = axios.create({
  baseURL: baseURL
});

export const userRequest = axios.create({
  baseURL: baseURL
});

export const getAuth = () => {
  const DATA = JSON.parse(localStorage.getItem('accessToken'));
  return DATA;
};

export const setAuth = (data) => {
  localStorage.setItem('accessToken', JSON.stringify(data));
};

export const clearAuth = () => {
  localStorage.removeItem('accessToken');
};

userRequest.interceptors.request.use(
  function (config) {
    const { token } = getAuth();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
