import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
    
export const httpClient = axios.create({
    baseURL: "https://api.preprod.statfive.fr/api",
    // baseURL: process.env.APP_API_BASE_URL,
});

httpClient.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem('token');
    config.headers['api-token'] =  token ? token : '';
    return config
});