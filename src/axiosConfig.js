import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
    
export const httpClient = axios.create({
    //baseURL: "https://api.preprod.statfive.fr/api",
    baseURL: process.env.API_URL ? process.env.API_URL : "https://api.statfive.fr/api",
});

httpClient.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem('token');
    config.headers['api-token'] =  token ? token : '';
    return config  
});