import axios from 'axios';

const baseURL = 'http://localhost:5000/api/v1';

// const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: baseURL,
});

export const userRequest = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    // Authorization: `Bearer ${TOKEN}`,
  },
});
