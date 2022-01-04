import axios from "axios";

const axiosInt = function() {
    const apiClient = axios.create({
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

        }
    });

    apiClient.interceptors.request.use(function (config) {
        const token = localStorage.getItem('tokens') ? `Bearer ${localStorage.getItem('tokens')}` : '';
        config.headers.Authorization =  token;
        return config;
    });
    
    return apiClient;
}()

export default {
    getApiClient() {
        return axiosInt
    },
    logIn(data) {
        return axiosInt.post('auth/login', data)
    },
    requestDataUpdate(stationId) {
        return axiosInt.get('measurement?station=' + stationId + '&sortBy=timestamp%3Adesc&limit=1&page=1')
    }
}