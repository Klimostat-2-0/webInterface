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
    requestDataUpdateDashboard(stationId) {
        return axiosInt.get('measurement?station=' + stationId + '&sortBy=timestamp%3Adesc&limit=1&page=1')
    },
    getStations() {
        return axiosInt.get('station/')
    },
    updateCO2Data(stationID, timestamp) {
        return axiosInt.get('measurement?station=' + stationID + "&sortBy=timestamp%3Adesc&limit=100&page=1&"
         + new URLSearchParams({
          fromTimestamp: timestamp,
        }))
    },
    getCO2Data(stationID) {
        return axiosInt.get('measurement?station=' + stationID + "&sortBy=timestamp%3Adesc&limit=100&page=1")
    }
}