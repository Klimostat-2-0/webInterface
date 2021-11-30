import {createStore} from "vuex"
import router from "../router"

export default createStore({
    state: {
        tokens: null,
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
          localStorage.setItem("tokens", data.tokens)
          localStorage.setItem("username", data.user)
          commit("auth_success", data.token, data.user)
          if (res.status == 200){
            router.push('Room')
          }
        }
    },
    modules: {

    }
}) 