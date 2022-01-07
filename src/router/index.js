import {createRouter, createWebHistory} from 'vue-router'

import About from '../pages/About'
import Startpage from '../pages/Startpage'
import Room from '../pages/Room'
import ErrorPage from '../pages/ErrorPage'
import Dashboard from '../pages/Dashboard'
import AddAccount from '../pages/AddAccount'
import Compare from '../pages/Compare.vue'
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
            requiresAuth: true,
            requiresAdminAuth: false
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
            requiresAuth: true,
            requiresAdminAuth: false
        }
    },
    {
        path: '/adduser',
        name: 'AddUser',
        component: AddAccount,
        meta: {
            requiresAuth: true,
            requiresAdminAuth: true
        }
    },{
        path: '/compare',
        name: 'Compare',
        component: Compare,
        meta: {
            requiresAuth: true,
            requiresAdminAuth: false
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'default',
        component: Startpage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth) && !store.getters.getLogInInfo) {
        next('/')
    } else if(to.matched.some(record => record.meta.requiresAdminAuth) && !store.getters.getAdminAccess){
        next('/dashboard')
    }else{
        next()
    }
})

export default router