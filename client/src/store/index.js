import { createStore } from 'vuex';
import moduleDanhSachXe from './moduleDanhSachXe';
import moduleKhachHang from './moduleKhachHang';
import moduleNhanVien from './moduleNhanVien';
import moduleChiNhanh from './moduleChiNhanh';

export default createStore({
    modules: {
        moduleDanhSachXe,
        moduleKhachHang,
        moduleNhanVien,
        moduleChiNhanh,
    }
})