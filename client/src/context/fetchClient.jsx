import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/v1/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});
export const setAuthorizationHeader = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
