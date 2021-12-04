import {createStore} from "vuex"
import router from "../router"

export default createStore({
    state: {
        tokens: localStorage.getItem("tokens") || "",
        user: null,
        showLoginError: null,
        loggedIn: false
    },
    mutations: {
      auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.showLoginError = null
        state.loggedIn = true
      },
      server_offline(state) {
        state.showLoginError = "The login Server seems to be offline"
      },
      wrong_user(state) {
        state.showLoginError = "You have entered a wrong username or password"
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
            if (res.status == 200){
              let data = await res.json()
              localStorage.setItem("tokens", data.tokens.access.token)
              localStorage.setItem("username", data.user)
              commit("auth_success", data.tokens.access.token, data.user)
              router.push('Room')
            }else {
              commit("wrong_user")
            }
          } catch(err) {
            commit("server_offline")
          }
        }
    },
    modules: {

    }
}) 