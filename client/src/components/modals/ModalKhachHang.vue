<template>
    <base-modal @closeModal="$emit('closeModal')" modalSize="lg" requiredTwoCols>
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <div>
                <base-input-group class="mb-1.5" label="Mã khách hàng" placeholderText="Mã mặc định" />
                <base-input-group class="mb-1.5" label="Tên khách hàng" :required="true" />
                <base-input-group class="mb-1.5" label="Ngày sinh" />
                <base-input-group class="mb-1.5" label="Điện thoại" />
                <base-input-group class="mb-1.5" label="Email" />
                <base-input-group class="mb-1.5" label="Địa chỉ" />
                <base-input-group-select class="mb-1.5" label="Tỉnh thành" placeholderText="Chọn tỉnh thành" :selectList="provinceList" @selected="getDistricts" />
                <base-input-group-select class="mb-1.5" label="Quận huyện" placeholderText="Chọn quận huyện" :selectList="districtList" />
                <base-input-group class="mb-1.5" label="Mã số thuế" />
                <base-textarea-group class="mb-1.5" label="Ghi chú" />
            </div>
            <div>
                <div class="grid grid-cols-2 gap-x-4 my-4 xl:mt-0">
                    <div class="text-center md:pl-32 lg:pl-0">
                        <div class="relative group flex items-center justify-center h-40 border border-dashed border-gray-300">
                            <img :src="imageAmount > 0 ? userImages[0] : '/src/assets/images/no-image-preview.png'" class="h-24" alt="chưa có hình ảnh nào được chọn">
                            <span @click="deleteImage(0)" v-if="imageAmount > 0" class="hidden group-hover:block absolute top-0 right-0 py-1 px-2.5 text-red-600 hover:text-red-400 cursor-pointer"><i class="fas fa-times"></i></span>
                        </div>
                        <label class="cursor-pointer block w-3/4 mx-auto mt-2 text-center py-1.5 rounded bg-open24-main text-white">
                            <span>Chọn ảnh</span>
                            <input type="file" multiple @change="updateImage($event)" class="hidden">
                        </label>
                    </div>
                    <div class="grid grid-cols-2 gap-1.5">
                        <div class="relative group border border-dashed border-gray-300 h-24">
                            <img v-if="imageAmount > 1" :src="userImages[1]" alt="user image">
                            <span @click="deleteImage(1)" v-if="imageAmount > 1" class="hidden group-hover:block absolute top-0 right-0 py-0.5 px-2 text-red-600 hover:text-red-400 cursor-pointer"><i class="fas fa-times"></i></span>
                        </div> 
                        <div class="relative group border border-dashed border-gray-300 h-24">
                            <img v-if="imageAmount > 2" :src="userImages[2]" alt="user image">
                            <span @click="deleteImage(2)" v-if="imageAmount > 2" class="hidden group-hover:block absolute top-0 right-0 py-0.5 px-2 text-red-600 hover:text-red-400 cursor-pointer"><i class="fas fa-times"></i></span>
                        </div>
                        <div class="relative group border border-dashed border-gray-300 h-24">
                            <img v-if="imageAmount > 3" :src="userImages[3]" alt="user image">
                            <span @click="deleteImage(3)" v-if="imageAmount > 3" class="hidden group-hover:block absolute top-0 right-0 py-0.5 px-2 text-red-600 hover:text-red-400 cursor-pointer"><i class="fas fa-times"></i></span>
                        </div>
                        <div class="relative group border border-dashed border-gray-300 h-24">
                            <img v-if="imageAmount > 4" :src="userImages[4]" alt="user image">
                            <span @click="deleteImage(4)" v-if="imageAmount > 4" class="hidden group-hover:block absolute top-0 right-0 py-0.5 px-2 text-red-600 hover:text-red-400 cursor-pointer"><i class="fas fa-times"></i></span>
                        </div>
                    </div>
                </div>
                <div class="flex mb-1.5">
                    <label class="w-32 text-gray-600">Khách hàng là</label>
                    <div class="flex-grow flex flex-col md:flex-row">
                        <div class="flex flex-auto justify-around px-2 h-8 leading-6 mb-1 border border-solid border-gray-300 rounded md:mb-0">
                            <label class="flex items-center">
                                <input type="radio" class="mx-1" name="iscPersonalCustomer" v-model="isPersonalCustomer" :value="true">
                                <span>Cá nhân</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" class="mx-1" name="iscPersonalCustomer" v-model="isPersonalCustomer" :value="false" />
                                <span>Công ty</span>
                            </label>
                        </div>
                        <div v-if="isPersonalCustomer" class="flex flex-auto justify-around px-2 ml-2 h-8 leading-6 border border-solid border-gray-300 rounded">
                            <label class="flex items-center">
                                <input type="radio" checked class="mx-1" name="gender" value="Nam">
                                <span>Nam</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" class="mx-1" name="gender" value="Nữ">
                                <span>Nữ</span>
                            </label>
                        </div>
                    </div>
                </div>
                <base-input-group-select requiredPlus @openModalAddNew="$emit('openModalNguonKhach')" class="mb-1.5" label="Nguồn khách" placeholderText="Chọn nguồn khách" :selectList="nguonKhachList" keywordFilter="TenNguonKhach" />
                <base-input-group class="mb-1.5" label="Người giới thiệu" placeholderText="Khách hàng" />
                <base-input-group-select requiredPlus @openModalAddNew="$emit('openModalNhomKhach')" class="mb-1.5" label="Nhóm khách" placeholderText="Chọn nhóm" :selectList="nhomKhachList" keywordFilter="TenNhomDoiTuong" />
                <base-input-group-select requiredPlus @openModalAddNew="$emit('openModalTrangThaiKhach')" class="mb-1.5" label="Trạng thái khách" placeholderText="Chọn trạng thái" :selectList="trangThaiKhachList" keywordFilter="Name" />
                <base-input-group-select-info class="mb-1.5" label="NV phụ trách" placeholderText="Chọn nhân viên" :selectList="nhanVienList" />
            </div>
        </template>
        <template v-slot:modal-footer>
            <button-cancel @click="$emit('closeModal')" />
            <button-save  class="button-distance" />
        </template>
    </base-modal>
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';
import BaseModal from '../base/BaseModal.vue';
import BaseInputGroup from '../base/BaseInputGroup.vue';
import BaseInputGroupSelect from '../base/BaseInputGroupSelect.vue';
import BaseInputGroupSelectInfo from '../base/BaseInputGroupSelectInfo.vue';
import BaseTextareaGroup from '../base/BaseTextareaGroup.vue';
import ButtonCancel from '../buttons/ButtonCancel.vue';
import ButtonSave from '../buttons/ButtonSave.vue';
import previewImage from '/Open24/client/src/composables/usePreviewImage';
import { computed } from '@vue/runtime-core';
import { getProvinceList } from '/Open24/client/src/composables/useProvinceList';
export default {
    components: {
        BaseModal,
        BaseInputGroup,
        BaseInputGroupSelect,
        BaseInputGroupSelectInfo,
        BaseTextareaGroup,
        ButtonCancel,
        ButtonSave,
    },
    props: {
        modalTitle: String,
        title: String,
        nguonKhachList: Array,
        nhomKhachList: Array,
        trangThaiKhachList: Array,
        nhanVienList: Array,
    },
    emits: ["closeModal", "openModalNguonKhach", "openModalNhomKhach", "openModalTrangThaiKhach"],
    setup() {
        const isPersonalCustomer = ref(true);
        const provinceList = ref([]);

        getProvinceList().then(provinces => {
            provinceList.value = provinces;
        })

        const districtList = ref([]);
        function getDistricts(proviceName) {
            const selectedProvice = provinceList.value.find(province => province.name === proviceName);
            districtList.value = selectedProvice.districts;
        }

        const userImages = ref([]);
        const userImagesList = [];
        const imageAmount = ref(0);
        function updateImage(event) {
            userImagesList.push(...previewImage(event));
            userImages.value = userImagesList;
            imageAmount.value = userImagesList.length;
        }

        function deleteImage(imageIndex) {
            userImagesList.splice(imageIndex, 1);
            userImages.value = userImagesList;
            imageAmount.value = userImagesList.length;
        }
        
        return {
            isPersonalCustomer,
            provinceList,
            districtList,
            getDistricts,
            userImages,
            updateImage,
            imageAmount,
            deleteImage
        }
    }
    
}
</script>