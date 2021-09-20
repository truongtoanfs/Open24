import { GetListDonVi_User } from '../data';

const state = {
    chiNhanhList: [],
};

const mutations = {
    UPDATE_CHI_NHANH_LIST(state, payload) {
        state.chiNhanhList = payload;
    },
};

const actions = {
    getChiNhanhList({ commit }) {
        // s/d axios ở đây để get data sau khi lấy đc data thì commit mutation
        commit('UPDATE_CHI_NHANH_LIST', GetListDonVi_User);
    },
};

const getters = {
    chiNhanhList: state => state.chiNhanhList,
};

const moduleChiNhanh = {
    state,
    mutations,
    actions,
    getters,
}

export default moduleChiNhanh;

