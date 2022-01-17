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
                    return err;
                }
            } else if(err.response.status===401 && requestConf._retry) {
                store.dispatch('redirectError');
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
    createStation(name, location, room) {
        return axiosInt.post('station/', {"name": name, "location": location, "roomNr": room})
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
    async updateCO2DataLongFormet(stationID, timestamp, page=1) {
        const query = 'measurement?station=' + stationID + "&sortBy=timestamp%3Adesc&limit=2147483647&page=" + page + "&"
        const response = await axiosInt.get(query
         + new URLSearchParams({
          fromTimestamp: timestamp,
        }))
        const data = response.data

        if (data.totalPages > page) {
            return data.results.concat(await this.updateCO2DataLongFormet(stationID, timestamp, page+1)) 
          } else {
            return data.results
        }
    },
    async updateCO2DataHistorical(stationID, startTime, endTime, page=1) {
        const query = 'measurement?station=' + stationID + "&sortBy=timestamp%3Adesc&limit=2147483647&page=" + page + "&"
        const response = await axiosInt.get(query
         + new URLSearchParams({
          fromTimestamp: startTime,
          toTimestamp: endTime
        }))
        const data = response.data

        if (data.totalPages > page) {
            return data.results.concat(await this.updateCO2DataLongFormet(stationID, timestamp, page+1)) 
          } else {
            return data.results
        }
    },
    getCO2Data(stationID) {
        return axiosInt.get('measurement?station=' + stationID + "&sortBy=timestamp%3Adesc&limit=100&page=1")
    },
    setNewLimit(stationID, limit, reset) {
        return axiosInt.patch('station/' + stationID, {"co2_limit": limit, "co2_reset": reset})
    },
    createUser(username, email, password) {
        return axiosInt.post('auth/register', {"name": username, "email": email, "password": password})
    },
    getAllUsers() {
        return axiosInt.get('users')
    },
    getUser(id) {
        return axiosInt.get('users/' + id)
    },
    patchUser(id, username, email, role) {
        return axiosInt.patch('users/' + id, {"name": username, "email":email, "role":role})
    },
    deleteUser(id) {
        return axiosInt.delete('users/' + id)
    },
    verifyEmail(token) {
        return axiosInt.post('auth/verify-email?token=' + token)
    },
    forgotPassword(email) {
        return axiosInt.post('auth/forgot-password', {"email": email})
    },
    resetPassword(token, password) {
        return axiosInt.post('auth/reset-password?token=' + token, {"password": password})
    },
    downloadMeasurements() {
        return axiosInt.get('export/json/measurements')
    },
    downloadStations() {
        return axiosInt.get('export/json/stations')
    }
}