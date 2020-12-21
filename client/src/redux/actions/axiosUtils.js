import axios from 'axios';

export const axiosCall = axios.create({
  baseURL: 'http://localhost:5000/',
});
export const axiosHeaders = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'content-type': 'application/json',
  },
});
