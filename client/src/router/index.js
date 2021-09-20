import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/home/Dashboard.vue';
import DanhSachXe from '../views/gara/DanhSachXe.vue';
import PhieuTiepNhan from '../views/gara/PhieuTiepNhan.vue';
import DanhSachBaoGia from '../views/giaodich/DanhSachBaoGia.vue';
import DanhSachHoaDon from '../views/giaodich/DanhSachHoaDon.vue';

const routes = [
    {
        path: '/',
        alias: '/Dashboard',
        name: 'dashboar',
        component: Dashboard,
        meta: {
            title: 'Open24.vn - Tổng quan',
        }
    },
    {
        path: '/DanhSachXe',
        name: 'danhSachXe',
        component: DanhSachXe,
        meta: {
            title: 'Open24.vn - Danh sách xe',
        }
    },
    {
        path: '/DanhSachPhieuTiepNhan',
        name: 'phieuTiepNhan',
        component: PhieuTiepNhan,
        meta: {
            title: 'Open24.vn - Phiếu tiếp nhận',
        }
    },
    {
        path: '/Quotation',
        name: 'baoGiaSuaChua',
        component: DanhSachBaoGia,
        meta: {
            title: 'Open24.vn - Báo giá sửa chữa',
        }
    },
    {
        path: '/HoaDonSuaChua',
        name: 'hoaDonSuaChua',
        component: DanhSachHoaDon,
        meta: {
            title: 'Open24.vn - Hóa đơn sửa chữa',
        }
    },
    
    {
        path: '/:pathMatch(.*)*',
        component: {
        name: 'not-found-blurb',
        template: `<h2>Not Found :(. Pick a movie from the list!</h2>`
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
// change pageTitle khi path thay đổi
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
})

export default router;
