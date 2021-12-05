import {createStore} from "vuex"
import router from "../router"

export default createStore({
    state: {
        tokens: localStorage.getItem("tokens") || null,
        showLoginError: null,
        loggedIn: localStorage.getItem("loggedIn") || false,
        dashboardValues: []
    },
    mutations: {
      auth_success(state, token) {
        state.tokens = token
        state.showLoginError = null
        state.loggedIn = true
      },
      server_offline(state) {
        state.showLoginError = "The login Server seems to be offline"
      },
      wrong_user(state) {
        state.showLoginError = "You have entered a wrong username or password"
      },
      logout(state) {
        state.tokens = null,
        state.showLoginError = null,
        state.loggedIn = false
      },
      updateDashboard(state, data) {
        state.dashboardValues[data[0]] = data[1]
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
              localStorage.setItem("loggedIn", true)
              commit("auth_success", data.tokens.access.token)
              router.push('Dashboard')
            }else {
              commit("wrong_user")
            }
          } catch(err) {
            commit("server_offline")
          }
        },
        async logout({commit}){
          localStorage.removeItem("tokens")
          localStorage.removeItem("loggedIn")
          commit("logout")
        },
        redirectError({commit}){
          router.push('/Error')
        },
        redirectAlreadyLoggedIn({commit}){
          router.push('/Dashboard')
        }
    },
    modules: {

    },
    getters: {
      getDashboardValues: state => {
        return state.dashboardValues
      }
    }
}) 