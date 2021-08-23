import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import DanhSachXe from '../views/DanhSachXe.vue';
import PhieuTiepNhan from '../views/PhieuTiepNhan.vue';
import BaoGiaSuaChua from '../views/BaoGiaSuaChua.vue';
import HoaDonSuaChua from '../views/HoaDonSuaChua.vue';

const routes = [
  {
    path: '/',
    alias: '/tongQuan',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/danhSachXe',
    name: 'danhSachXe',
    component: DanhSachXe,
  },
  {
    path: '/phieuTiepNhan',
    name: 'phieuTiepNhan',
    component: PhieuTiepNhan,
  },
  {
    path: '/baoGiaSuaChua',
    name: 'baoGiaSuaChua',
    component: BaoGiaSuaChua,
  },
  {
    path: '/hoaDonSuaChua',
    name: 'hoaDonSuaChua',
    component: HoaDonSuaChua,
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
