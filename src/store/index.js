import {createStore} from "vuex"

export default createStore({
    state: {
        token: null
    },
    mutations: {

    },
    actions: {
        login({commit}, user) {
            fetch(process.env.VUE_APP_BASEURL + 'auth/login', {
                method: 'POST',
                mode: "cors",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: user
              })
              .then(response => console.log(response))
        }
    },
    modules: {

    }
}) 