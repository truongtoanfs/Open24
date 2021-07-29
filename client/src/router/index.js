import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/:slug',
    name: 'pages.show',
    component: () => import('../views/PagesShow.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
