import { GetDM_NguonKhach, GetNhomDoiTuong_DonVi, GetTrangThaiTimKiem } from '../data';

const state = {
    nguonKhachList: [],
    nhomKhachList: [],
    trangThaiKhachList: [],
};

const mutations = {
    UPDATE_NGUONKHACH_LIST(state, payload) {
        state.nguonKhachList = payload;
    },
    UPDATE_NHOMKHACH_LIST(state, payload) {
        state.nhomKhachList = payload;
    },
    UPDATE_TRANGTHAIKHACH_LIST(state, payload) {
        state.trangThaiKhachList = payload;
    },
};

const actions = {
    getNguonKhachList({ commit }) {
        // s/d axios ở đây để get data sau khi lấy đc data thì commit mutation
        commit('UPDATE_NGUONKHACH_LIST', GetDM_NguonKhach);
    },
    getNhomKhachList({ commit }) {
        commit('UPDATE_NHOMKHACH_LIST', GetNhomDoiTuong_DonVi.data);
    },
    getTrangThaiKhachList({ commit }) {
        commit('UPDATE_TRANGTHAIKHACH_LIST', GetTrangThaiTimKiem.dataSoure.ttkhachhang);
    },
};

const getters = {
    nguonKhachList: state => state.nguonKhachList,
    nhomKhachList: state => state.nhomKhachList,
    trangThaiKhachList: state => state.trangThaiKhachList,
};

const moduleKhachHang = {
    state,
    mutations,
    actions,
    getters,
}

export default moduleKhachHang;

