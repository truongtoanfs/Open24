<template>
    <base-modal @closeModal="$emit('closeModal')" modalSize="xl">
        <template #modal-title>Chiết khấu nhân viên </template>
        <template #modal-content>
            <div class="xl:flex">
                <div>
                    <div class="font-normal border-b border-gray-300">
                        <span @click="activedTab = 'actionTab'" :class="activedTab == 'actionTab' ? 'text-open24-main border-open24-main': ''" class="inline-block py-2 px-3 border-b-2 border-transparent">Thực hiện</span>
                        <span @click="activedTab = 'advisoryTab'" :class="activedTab == 'advisoryTab' ? 'text-open24-main border-open24-main': ''" class="inline-block py-2 px-3 border-b-2 border-transparent">Tư vấn</span>
                    </div>
                    <base-search-input @filterInput="filterListNhanVien" class="mt-4" searchLabel="Tìm kiếm theo tên, mã, SĐT nhân viên" />
                    <ul class="max-h-96 overflow-auto">
                        <li v-for="(nhanVien, index) in nhanVienList" :key="index" @click="addToTable(nhanVien)" class="flex items-center border-b border-gray-300 pb-2 pt-3 mx-2 hover:bg-gray-100 transition-all duration-300 cursor-default">
                            <div class="px-3">
                                <img :src="nhanVien.GioiTinh ? '/src/assets/images/icon-gioi-tinh-nam.png' : '/src/assets/images/icon-gioi-tinh-nu.png'" alt="icon khách hàng" class="p-1 border border-dashed border-gray-300">
                            </div>
                            <div class="flex flex-col">
                                <span>Mã nhân viên: {{ nhanVien.MaNhanVien }}</span>
                                <span class="whitespace-nowrap">{{ nhanVien.TenNhanVien }}</span>
                                <span class="font-normal">SĐT: {{ nhanVien.SoDienThoai }}</span>
                                <span class="font-normal whitespace-nowrap">Trạng thái: Đang rảnh</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="ml-4 flex-cover">
                    <div class="mt-2 xl:flex justify-between">
                        <div class="text-red-500 font-normal mb-1">
                            <span class="inline-block w-7 text-center"><i class="fas fa-info-circle text-gray-400"></i></span>
                            <span>Dịch vụ: {{ data.TenHangHoa }}</span>
                        </div>
                        <div class="text-red-500 font-normal">
                            <span class="inline-block w-7 text-center"><i class="fas fa-dollar-sign"></i></span>
                            <span>Tính tiền chiết khấu: {{ data.ThanhTien }} đ</span>
                        </div>
                    </div>
                    <div class="flex items-center mt-1.5">
                        <span class="pl-2">Chia đều chiết khấu</span>
                        <label class="flex items-center mx-6">
                            <input type="radio" value="true" v-model="isChiaChietKhau" class="mr-2"> Có
                        </label>
                        <label class="flex items-center">
                            <input type="radio" value="false" v-model="isChiaChietKhau" class="mr-2" checked> Không
                        </label>
                    </div>
                    <div class="table-wrap h-96">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="table-th">Theo yêu cầu</th>
                                    <th class="table-th">Nhân viên</th>
                                    <th class="table-th">Chiết khấu</th>
                                    <th class="table-th">Hệ số</th>
                                    <th class="table-th">Tiền được nhận</th>
                                    <th class="table-th"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(nhanVien, index) in selectedNhanVienList" :key="index">
                                    <td class="whitespace-nowrap font-normal py-1 px-2 text-center">
                                        <input type="checkbox" class="checkbox-size" v-if="nhanVien.LoaiNhanVien === 'Thực hiện'">
                                    </td>
                                    <td class="whitespace-nowrap font-normal py-1 px-2 ">
                                        <p>{{ nhanVien.TenNhanVien }}</p>
                                        <p class="text-xs">{{ nhanVien.LoaiNhanVien }}</p>
                                    </td>
                                    <td @click="nhanVien.editChietKhau = true" @clickout="nhanVien.editChietKhau = false" class="whitespace-nowrap font-normal py-1 px-2 text-right relative">
                                        <input type="text" readonly :value="nhanVien.chietKhau" class="inline-block w-full px-2 border-b border-gray-300 focus:outline-none text-right">
                                        <div v-if="nhanVien.editChietKhau" class="absolute top-11 -left-full z-10 border border-open24-main flex items-center p-2.5 rounded bg-open24-base lg:-left-1/4 xl:-left-3/4">
                                            <span>Nhập chiết khấu: </span>
                                            <input @click="highlightText($event)" class="inline-block w-24 h-7 mx-3 border-0 border-b border-gray-300 focus:outline-none text-right" type="text" v-model="nhanVien.chietKhau">
                                            <label class="relative flex items-center w-14 h-7 my-0.5 bg-gray-300 rounded-2xl">
                                                <input type="checkbox" v-model="nhanVien.chietKhauTheoPhanTram" class="hidden toggle-button">
                                                <div class="button-slider w-6 h-6 rounded-full absolute top-0.5 left-0.5 bg-open24-main"></div>
                                                <span class="vnd-text relative z-10 w-7 ml-px text-center font-10 text-open24-accent">VNĐ</span>
                                                <span class="percent-text relative z-10 w-7 ml-px text-center font-13 text-open24-base">%</span>
                                            </label>
                                        </div>
                                        <div v-if="nhanVien.editChietKhau" class="absolute top-9 left-1/2 z-10 arrow border-b-8 border-open24-main"></div>
                                    </td>  
                                    <td class="whitespace-nowrap font-normal py-1 px-2 text-right">
                                        <input type="text" :value="nhanVien.heSoChietKhau" class="inline-block w-full px-2 border-b border-gray-300 focus:outline-none text-right">
                                    </td>
                                    <td class="whitespace-nowrap font-normal py-1 px-2 text-right">{{ nhanVien.tienNhanDuoc }}</td>
                                    <td class="whitespace-nowrap font-normal py-1 px-1 text-center">
                                        <span @click="removeFromTable(index)" class="text-red-500 px-3 py-1.5 cursor-pointer hover:bg-gray-200 rounded">
                                            <i class="fas fa-times"></i>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </template>
        <template #modal-footer>
            <button-cancel @click="$emit('closeModal')" />
            <button-save class="button-distance" />
        </template>
    </base-modal>
</template>

<script>
import BaseModal from '../base/BaseModal.vue';
import ButtonCancel from '../buttons/ButtonCancel.vue';
import ButtonSave from '../buttons/ButtonSave.vue';
import BaseSearchInput from '../base/BaseSearchInput.vue';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import filterData from '../../composables/useFilterData';
import highlightText from '../../composables/useHighlightText';

export default {
    components: {
        BaseModal,
        ButtonCancel,
        ButtonSave,
        BaseSearchInput,
    },
    props: {
        data: Object,
    },
    emits: ['closeModal'],
    setup(props) {
        const TongTien = props.data.ThanhTien;

        const activedTab = ref('actionTab');

        const store = useStore();
        store.dispatch('getNhanVienList');
        const nhanVienData = computed(() => {
            return store.getters.nhanVienList;
        })

        const typedInput = ref('');
        function filterListNhanVien(filterInput) {
            typedInput.value = filterInput;
        }
        const nhanVienList = computed(() => {
            return filterData(typedInput.value, nhanVienData.value, ['MaNhanVien', 'TenNhanVien', 'SoDienThoai']);
        });

        const isChiaChietKhau = ref('false');
        const selectedNhanVienList = ref([]);

        function addToTable(nhanVien) {
            nhanVien.LoaiNhanVien = activedTab.value === 'actionTab' ? 'Thực hiện' : 'Tư vấn';
            const isInSelectedList = selectedNhanVienList.value.some(item => {
                return item.MaNhanVien === nhanVien.MaNhanVien && item.LoaiNhanVien === nhanVien.LoaiNhanVien;
            })
            if(isInSelectedList) {
                alert('Nhân viên này đã được chọn!');
            } else {
                selectedNhanVienList.value.push({
                    ID: nhanVien.ID,
                    MaNhanVien: nhanVien.MaNhanVien,
                    TenNhanVien: nhanVien.TenNhanVien,
                    SoDienThoai: nhanVien.SoDienThoai,
                    GioiTinh: nhanVien.GioiTinh,
                    LoaiNhanVien: nhanVien.LoaiNhanVien,
                    editChietKhau: false,
                    chietKhau: 0,
                    chietKhauTheoPhanTram: true,
                    heSoChietKhau: 1,
                    tienNhanDuoc: 0,
                });
            }
        }

        function calculateHeSoChietKhau() {
            let heSoChietKhau = 1;
            if(isChiaChietKhau.value === 'true') {
                const tongChia = selectedNhanVienList.value.length;
                const dieuKienLamTron = (1 / tongChia).toString().length > 4; //0.33333 --> 0.33
                heSoChietKhau = dieuKienLamTron ? (1 / tongChia).toFixed(2) : (1 / tongChia);
            }
            return heSoChietKhau;
        }

        function calculateTienNhanDuoc(nhanVien) {
            if(nhanVien.chietKhauTheoPhanTram) {
                return nhanVien.chietKhau * TongTien * nhanVien.heSoChietKhau / 100;
            } else {
                return nhanVien.chietKhau * nhanVien.heSoChietKhau;
            }
        }

        watch([isChiaChietKhau, selectedNhanVienList], () => {
            if(selectedNhanVienList.value.length > 0) {
                selectedNhanVienList.value.map(nhanVien => {
                    nhanVien.heSoChietKhau = calculateHeSoChietKhau();
                    nhanVien.tienNhanDuoc = calculateTienNhanDuoc(nhanVien);
                    return nhanVien;
                })
            }
        }, {deep: true});


        function removeFromTable(index) {
            selectedNhanVienList.value.splice(index, 1);
        }

        return {
           nhanVienList,
           filterListNhanVien,
           activedTab,
           addToTable,
           isChiaChietKhau,
           selectedNhanVienList,
           removeFromTable,
           highlightText,
        }
    }
}
</script>


<style scoped>
    .button-slider, .percent-text, .vnd-text {
        @apply transition-all duration-300 ease-in-out;
    }
    .toggle-button:checked + .button-slider {
        left: 30px;
    }
    .toggle-button:checked ~ .percent-text {
        @apply text-open24-accent;
    }
    .toggle-button:checked ~ .vnd-text {
        @apply text-open24-base;
    }
    .font-10 {
        font-size: 10px;
    }

    .arrow {
        width: 0; 
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }
</style>