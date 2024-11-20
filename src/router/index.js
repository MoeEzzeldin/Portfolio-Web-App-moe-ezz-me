import { createRouter, createWebHistory } from 'vue-router'
import MainInfo from '@/components/Main-Info.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainInfo
    },
  ]
})

export default router
