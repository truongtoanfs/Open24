import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import DanhSachXe from '../views/DanhSachXe.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/danhSachXe',
    name: 'danhSachXe',
    component: DanhSachXe,
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
