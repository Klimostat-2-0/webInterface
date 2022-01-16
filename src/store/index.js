import {createStore} from "vuex"
import router from "../router"
import dataService from "../services/dataService"

export default createStore({
    state: {
        tokens: localStorage.getItem("tokens") || null,
        tokenObj: localStorage.getItem("tokenObj") || null,
        isAdmin: localStorage.getItem("isAdmin") == 'true' || false,
        showLoginError: null,
        loggedIn: localStorage.getItem("loggedIn") == 'true' || false,
        dashboardValues: []
    },
    mutations: {
      auth_success(state, data) {
        state.tokens = data[0].access.token
        state.tokenObj = JSON.stringify(data[0])
        state.isAdmin = data[1]
        state.showLoginError = null
        state.loggedIn = true
      },
      server_offline(state) {
        state.showLoginError = "The login Server seems to be offline"
      },
      wrong_user(state) {
        state.showLoginError = "You have entered a wrong username or password"
      },
      verify_email(state) {
        state.showLoginError = "Please verify your email address!"
      },
      setCustomErrorMessage(state, data) {
        state.showLoginError = data
      },
      logout(state) {
        state.tokens = null,
        state.tokenObj = null,
        state.showLoginError = null,
        state.loggedIn = false,
        state.isAdmin = false
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
              localStorage.setItem("isAdmin", data.user.role=='admin')
              commit("auth_success", [data.tokens, (data.user.role=='admin')])
              router.push('Dashboard')
            }else {
              commit("setCustomErrorMessage", res.response.data.message)
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
          localStorage.removeItem("isAdmin")
          commit("logout")
        },
        redirectError({commit}){
          router.push('/Error')
        },
        redirectAlreadyLoggedIn({commit}){
          router.push('/Dashboard')
        },
        redirectLogin({commit}){
          router.push('/Login')
        },
        redirectUserEdit({commit}, id){
          router.push('/user/' + id)
        },
        updateTokenObj({commit}, tokenObj){
          localStorage.setItem("tokens", tokenObj.tokens.access.token)
          localStorage.setItem("tokenObj", JSON.stringify(tokenObj.tokens))
          localStorage.setItem("loggedIn", true)
          commit("auth_success", [tokenObj.tokens, (localStorage.getItem("isAdmin") == 'true')])
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
      },
      getLogInInfo: state => {
        return state.loggedIn
      },
      getAdminAccess: state => {
        if(state.loggedIn && state.isAdmin) {
          return true
        } else {
          return false
        }
      }
    }
}) 