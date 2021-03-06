import {createRouter, createWebHistory} from 'vue-router'

import About from '../pages/About'
import Startpage from '../pages/Startpage'
import Room from '../pages/Room'
import ErrorPage from '../pages/ErrorPage'
import Dashboard from '../pages/Dashboard'
import AddAccount from '../pages/AddAccount'
import Compare from '../pages/Compare.vue'
import DataHistory from '../pages/ExportData'
import VerifyEmail from '../pages/VerifyEmail'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import EditUser from '../pages/EditUser'
import EditStation from '../pages/EditStation'
import AddStation from '../pages/AddStation'
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
        path: '/user/:id',
        name: 'useredit',
        component: EditUser,
        meta: {
            requiresAuth: true,
            requiresAdminAuth: true
        }
    },
    {
        path: '/station/:id',
        name: 'editStation',
        component: EditStation,
        meta: {
            requiresAuth: true,
            requiresAdminAuth: true
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
    },
    {
        path: '/addstation',
        name: 'AddStation',
        component: AddStation,
        meta: {
            requiresAuth: true,
            requiresAdminAuth: true
        }
    },
    {
        path: '/compare',
        name: 'Compare',
        component: Compare,
        meta: {
            requiresAuth: true,
            requiresAdminAuth: false
        }
    },
    {
        path: '/history',
        name: 'History',
        component: DataHistory,
        meta: {
            requiresAuth: true,
            requiresAdminAuth: false
        }
    },
    {
        path: "/auth/verify-email",
        name: 'verifyEmail',
        component: VerifyEmail,
        meta: {
            requiresAuth: false,
            requiresAdminAuth: false
        }
    },
    {
        path: "/auth/reset-password",
        name: 'ResetPassword',
        component: ResetPassword,
        meta: {
            requiresAuth: false,
            requiresAdminAuth: false
        }
    },
    {
        path: "/forgotPassword",
        name: 'ForgotPassword',
        component: ForgotPassword,
        meta: {
            requiresAuth: false,
            requiresAdminAuth: false
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'default',
        component: Startpage
    }
]


function initRouter() {
    let router = createRouter({
        history: createWebHistory(process.env.BASE_URL), 
        routes,
        scrollBehavior(to, from, savedPosition) {
            return { left: 0, top: 0 };
        }
    })
    router.beforeEach((to, from, next) => { 
        if(document.documentElement.clientWidth < 768) {
            store.commit("switchToggle")
        }
        if(to.matched.some(record => record.meta.requiresAuth) && !store.getters.getLogInInfo) {
            next('/')
        } else if(to.matched.some(record => record.meta.requiresAdminAuth) && !store.getters.getAdminAccess){
            next('/dashboard')
        }else{
            next()
        }
    })
    return router
}

export default initRouter()