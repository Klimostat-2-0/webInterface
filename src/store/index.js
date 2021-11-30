import {createStore} from "vuex"
import router from "../router"

export default createStore({
    state: {
        tokens: localStorage.getItem("tokens") || "",
        user: null
    },
    mutations: {
      auth_success(state, token, user) {
        state.token = token
        state.user = user
      }
    },
    actions: {
        async login({commit}, user) {
          let res = await fetch(process.env.VUE_APP_BASEURL + 'auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: user
          })
          let data = await res.json()
          console.log(data.tokens.access.token)
          localStorage.setItem("tokens", data.tokens.access.token)
          localStorage.setItem("username", data.user)
          commit("auth_success", data.tokens.access.token, data.user)
          if (res.status == 200){
            router.push('Room')
          }
        }
    },
    modules: {

    }
}) 