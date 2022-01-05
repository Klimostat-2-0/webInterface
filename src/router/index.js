import {createRouter, createWebHistory} from 'vue-router'

import About from '../pages/About'
import Startpage from '../pages/Startpage'
import Room from '../pages/Room'
import ErrorPage from '../pages/ErrorPage'
import Dashboard from '../pages/Dashboard'
import AddAccount from '../pages/AddAccount'
import store from "../store/index"

const routes = [
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/',
        name: 'Start',
        component: Startpage
    },
    {
        path: '/room/:id',
        name: 'Room',
        component: Room,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/error',
        name: 'Error',
        component: ErrorPage
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/adduser',
        name: 'AddUser',
        component: AddAccount,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth) && !store.getters.getLogInInfo) {
        next('/')
    }else{
        next()
    }
})

export default router