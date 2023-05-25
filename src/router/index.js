import { createRouter, createWebHistory } from 'vue-router' 
 
import AdminRouter from '@/modules/admin/router'
import isAuthenticatedGuard from '@/modules/admin/router/authMiddleware' 
 
 
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */  '@/modules/auth/views/LoginView.vue'),
  },
 
  {
    path: '/Dashboard',
    beforeEnter: [ isAuthenticatedGuard ],
    ...AdminRouter
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
