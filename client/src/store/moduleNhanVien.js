import { GetNS_NhanVien_InforBasic } from '../data';

const state = {
    nhanVienList: [],
};

const mutations = {
    UPDATE_NHANVIEN_LIST(state, payload) {
        state.nhanVienList = payload;
    },
};

const actions = {
    getNhanVienList({ commit }) {
        // s/d axios ở đây để get data sau khi lấy đc data thì commit mutation
        commit('UPDATE_NHANVIEN_LIST', GetNS_NhanVien_InforBasic);
    },
};

const getters = {
    nhanVienList: state => state.nhanVienList,
};

const moduleNhanVien = {
    state,
    mutations,
    actions,
    getters,
}

export default moduleNhanVien;

