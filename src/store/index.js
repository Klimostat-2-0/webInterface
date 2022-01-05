import {createStore} from "vuex"
import router from "../router"
import dataService from "../services/dataService"

export default createStore({
    state: {
        tokens: localStorage.getItem("tokens") || null,
        tokenObj: localStorage.getItem("tokenObj") || null,
        showLoginError: null,
        loggedIn: localStorage.getItem("loggedIn") || false,
        dashboardValues: []
    },
    mutations: {
      auth_success(state, tokens) {
        state.tokens = tokens.access.token
        state.tokenObj = JSON.stringify(tokens)
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
        state.tokenObj = null,
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
            let res = await dataService.logIn(user)
            if (res.status == 200){
              let data = res.data
              localStorage.setItem("tokens", data.tokens.access.token)
              localStorage.setItem("tokenObj", JSON.stringify(data.tokens))
              localStorage.setItem("loggedIn", true)
              commit("auth_success", data.tokens)
              router.push('Dashboard')
            }else {
              commit("wrong_user")
            }
          } catch(err) {
            console.log(err)
            commit("server_offline")
          }
        },
        async logout({commit}){
          localStorage.removeItem("tokens")
          localStorage.removeItem("tokenObj")
          localStorage.removeItem("loggedIn")
          commit("logout")
        },
        redirectError({commit}){
          router.push('/Error')
        },
        redirectAlreadyLoggedIn({commit}){
          router.push('/Dashboard')
        },
        updateTokenObj({commit}, tokenObj){
          localStorage.setItem("tokens", tokenObj.tokens.access.token)
          localStorage.setItem("tokenObj", JSON.stringify(tokenObj.tokens))
          localStorage.setItem("loggedIn", true)
          commit("auth_success", tokenObj.tokens)
        }
    },
    modules: {

    },
    getters: {
      getDashboardValues: state => {
        return state.dashboardValues
      },
      getTokenObj: state => {
        return state.tokenObj
      },
      getRefreshToken: state => {
        return JSON.parse(state.tokenObj).refresh.token
      }
    }
}) 