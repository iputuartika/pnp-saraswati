import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
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
      path: '/data/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/data/merk',
      name: 'Merk',
      component: () => import('../views/MerkView.vue')
    },
    {
      path: '/data/category',
      name: 'Category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/coba',
      name: 'Coba',
      component: () => import('../views/Coba.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../App.vue')
    }
  ]
})

export default router
