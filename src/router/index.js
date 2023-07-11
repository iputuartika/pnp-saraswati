import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
      // children: [
      //   {
      //     path: '/about',
      //     name: 'About',
      //     component: () => import('../views/AboutView.vue')
      //   }
      // ]
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/coba',
      name: 'Coba',
      component: () => import('../views/Coba.vue')
    }
  ]
})

export default router
