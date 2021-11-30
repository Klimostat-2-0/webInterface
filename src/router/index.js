import {createRouter, createWebHistory} from 'vue-router'

import About from '../pages/About'
import Startpage from '../pages/Startpage'
import Room from '../pages/Room'

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
        path: '/room',
        name: 'Room',
        component: Room
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), routes
})

export default router