import axios from "axios";
import store from "../store/index"

const axiosInt = function() {
    const apiClient = axios.create({
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

        }
    });

    apiClient.interceptors.request.use((config) => {
        const token = localStorage.getItem('tokens') ? `Bearer ${localStorage.getItem('tokens')}` : '';
        config.headers.Authorization =  token;
        return config;
    });
    apiClient.interceptors.response.use(
        (res) => {
            return res
        },
        async (err) => {
        const requestConf = err.config;
        if(err.response){
            if(err.response.status===401 && !requestConf._retry && !requestConf.url.includes('auth/refresh-tokens')){
                requestConf._retry = true;
                try {
                    const res = await refreshToken()
                    if(res.status != 200){
                        return err
                    }
                    const newTokenObj = {"tokens": res.data};
                    store.dispatch('updateTokenObj', newTokenObj);
                    return axiosInt(requestConf);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return err;
    }
    )
    return apiClient;
}()

function refreshToken() {
    return axiosInt.post('auth/refresh-tokens', JSON.stringify({"refreshToken": store.getters.getRefreshToken}))
}

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
    getStationsById(stationId) {
        return axiosInt.get('station/'+stationId)
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