import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v1';

export const publicRequest = axios.create({
  baseURL: baseURL,
});

export const userRequest = axios.create({
  baseURL: baseURL,
});

userRequest.interceptors.request.use(
  function (config) {
    const user = JSON.parse(localStorage.getItem('persist:root'))?.users;
    const currentUser = user && JSON.parse(user).currentUser;
    const TOKEN = currentUser?.token;
    if (TOKEN) {
      config.headers['Authorization'] = 'Bearer ' + TOKEN;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
