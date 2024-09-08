import { createRouter, createWebHistory } from 'vue-router'
import FixedAbout from '@/components/Fixed-About.vue'
import ScrollInfo from '@/components/About-me.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'fixed-about',
      component: FixedAbout
    },
    {
      path: '/about',
      name: 'scroll-info',
      component: ScrollInfo
    }
  ]
})

export default router
