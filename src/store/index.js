import {createStore} from "vuex"
import router from "../router"

export default createStore({
    state: {
        tokens: localStorage.getItem("tokens") || "",
        user: null,
        showLoginError: null
    },
    mutations: {
      auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.showLoginError = null
      },
      server_offline(state) {
        state.showLoginError = "The login Server seems to be offline"
      }
    },
    actions: {
        async login({commit}, user) {
          try {
            let res = await fetch(process.env.VUE_APP_BASEURL + 'auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: user
            })
            let data = await res.json()
            print(res)
            print(data)
          } catch(err) {
            commit("server_offline")
            console.log("Handel the Error")
          }
          /*console.log(data.tokens.access.token)
          localStorage.setItem("tokens", data.tokens.access.token)
          localStorage.setItem("username", data.user)
          commit("auth_success", data.tokens.access.token, data.user)
          if (res.status == 200){
            router.push('Room')
          }*/
        }
    },
    modules: {

    }
}) 