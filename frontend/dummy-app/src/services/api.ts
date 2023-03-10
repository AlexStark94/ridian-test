import axios, { AxiosError } from 'axios';
import { getConfig } from '../utils/config';

function getBaseUrl() {
  return getConfig().API_URL;
}

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000"
  },
  timeout: 60000
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export { api };