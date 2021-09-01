import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import DanhSachXe from '../views/DanhSachXe.vue';
import PhieuTiepNhan from '../views/PhieuTiepNhan.vue';
import BaoGiaSuaChua from '../views/BaoGiaSuaChua.vue';
import HoaDonSuaChua from '../views/HoaDonSuaChua.vue';

const routes = [
    {
        path: '/',
        alias: '/Dashboard',
        component: Dashboard,
    },
    {
        path: '/DanhSachXe',
        name: 'danhSachXe',
        component: DanhSachXe,
    },
    {
        path: '/DanhSachPhieuTiepNhan',
        name: 'phieuTiepNhan',
        component: PhieuTiepNhan,
    },
    {
        path: '/Quotation',
        name: 'baoGiaSuaChua',
        component: BaoGiaSuaChua,
    },
    {
        path: '/HoaDonSuaChua',
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
