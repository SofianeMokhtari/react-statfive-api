import axios from "axios";
    
export const httpClient = axios.create({
    baseURL: "https://api.preprod.statfive.fr/api",
    // baseURL: process.env.APP_API_BASE_URL,
});

httpClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers['api-token'] =  token ? `Bearer ${token}` : '';
});