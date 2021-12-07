import {createRouter, createWebHistory} from 'vue-router'

import About from '../pages/About'
import Startpage from '../pages/Startpage'
import Room from '../pages/Room'
import ErrorPage from '../pages/ErrorPage'
import Dashboard from '../pages/Dashboard'
import AddAccount from '../pages/AddAccount'

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
        component: Room
    },
    {
        path: '/error',
        name: 'Error',
        component: ErrorPage
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/adduser',
        name: 'AddUser',
        component: AddAccount
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

export default router