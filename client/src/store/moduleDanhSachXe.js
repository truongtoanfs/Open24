import { GetAllHangXes, GetAllLoaiXes, GetAllDanhMucMauXe, GetChuXeList, GetListGaraDanhMucXe_v1,
Gara_GetListHoaDonSuaChua_v2, Gara_GetListNhatKyBaoDuongTheoXe, Gara_GetListLichBaoDuongTheoXe } from '../data';

const state = {
    hangXeList : [],
    loaiXeList: [],
    mauXeList: [],
    chuXeList: [],
    danhSachXeTableData: [],
    lichSuSuaChuaTableData: [],
    nhatKyBaoDuongTableData: [],
    lichBaoDuongTableData: [],
};

const mutations = {
    UPDATE_HANG_XE_LIST(state, payload) {
        state.hangXeList = payload;
    },
    UPDATE_LOAI_XE_LIST(state, payload) {
        state.loaiXeList = payload;
    },
    UPDATE_MAU_XE_LIST(state, payload) {
        state.mauXeList = payload;
    },
    UPDATE_CHU_XE_LIST(state, payload) {
        state.chuXeList = payload;
    },
    UPDATE_DANH_SACH_XE_TABLE_DATA(state, payload) {
        state.danhSachXeTableData = payload;
    },
    UPDATE_LICH_SU_SUA_CHUA_TABLE_DATA(state, payload) {
        state.lichSuSuaChuaTableData = payload;
    },
    UPDATE_NHAT_KY_BAO_DUONG_TABLE_DATA(state, payload) {
        state.nhatKyBaoDuongTableData = payload;
    },
    UPDATE_LICH_BAO_DUONG_TABLE_DATA(state, payload) {
        state.lichBaoDuongTableData = payload;
    },
};

const actions = {
    getHangXeList({ commit }) {
        // s/d axios ở đây để get data sau khi lấy đc data thì commit mutation
        commit('UPDATE_HANG_XE_LIST', GetAllHangXes.dataSoure);
    },
    getLoaiXeList({ commit }) {
        commit('UPDATE_LOAI_XE_LIST', GetAllLoaiXes.dataSoure);
    },
    getMauXeList({ commit }) {
        commit('UPDATE_MAU_XE_LIST', GetAllDanhMucMauXe.dataSoure);
    },
    getChuXeList({ commit }) {
        commit('UPDATE_CHU_XE_LIST', GetChuXeList);
    },
    getDanhSachXeTableData({ commit }) {
        commit('UPDATE_DANH_SACH_XE_TABLE_DATA', GetListGaraDanhMucXe_v1.dataSoure);
    },
    getLichSuSuaChuaTableData({ commit }) {
        commit('UPDATE_LICH_SU_SUA_CHUA_TABLE_DATA', Gara_GetListHoaDonSuaChua_v2.dataSoure);
    },
    getNhatKyBaoDuongTableData({ commit }) {
        commit('UPDATE_NHAT_KY_BAO_DUONG_TABLE_DATA', Gara_GetListNhatKyBaoDuongTheoXe.dataSoure);
    },
    getLichBaoDuongTableData({ commit }) {
        commit('UPDATE_LICH_BAO_DUONG_TABLE_DATA', Gara_GetListLichBaoDuongTheoXe.dataSoure);
    },
};

const getters = {
    hangXeList: state => state.hangXeList,
    loaiXeList: state => state.loaiXeList,
    mauXeList: state => state.mauXeList,
    chuXeList: state => state.chuXeList,
    danhSachXeTableData: state => state.danhSachXeTableData,
    lichSuSuaChuaTableData: state => state.lichSuSuaChuaTableData,
    nhatKyBaoDuongTableData: state => state.nhatKyBaoDuongTableData,
    lichBaoDuongTableData: state => state.lichBaoDuongTableData,
};

const moduleDanhSachXe = {
    state,
    mutations,
    actions,
    getters,
}

export default moduleDanhSachXe;

