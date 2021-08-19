import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            branches: [
                { id: 0, name: 'Ssoft Cầu giấy'},
                { id: 1, name: 'Chi nhánh 02' },
                { id: 2, name: 'Chi nhánh 03' },
                { id: 3, name: 'Chi nhánh 04' },
                { id: 4, name: 'Chi nhánh 05' },
            ]
        }
    }
})