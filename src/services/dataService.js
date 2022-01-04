import axios from "axios";

const axiosInt = function() {
    const errorInterceptor = axios.interceptors.request.use(
        function(request) {
            console.log("intercepted the request")
        }
    )
    
    const apiClient = axios.create({
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tokens') ? `Bearer ${localStorage.getItem('tokens')}` : ''
        }
    })

    apiClient.interceptors.request.use(errorInterceptor)
    
    return apiClient
}()

export default {
    getApiClient() {
        return axiosInt
    },
    logIn(cre) {
        console.log("log in axios" + cre)
        console.log(axiosInt.interceptors)
    }
}