<template>
    <BaseModal @closeModal="$emit('closeModal')" modalSize="lg" requiredTwoCols>
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <div>
                <BaseInputGroup class="mb-1.5" label="Mã khách hàng" placeholderText="Mã mặc định" />
                <BaseInputGroup class="mb-1.5" label="Tên khách hàng" :required="true" />
                <BaseInputGroup class="mb-1.5" label="Ngày sinh" />
                <BaseInputGroup class="mb-1.5" label="Điện thoại" />
                <BaseInputGroup class="mb-1.5" label="Email" />
                <BaseInputGroup class="mb-1.5" label="Địa chỉ" />
                <BaseInputGroupSelect :requiredPlus="false" class="mb-1.5" label="Tỉnh thành" placeholderText="Chọn tỉnh thành" :selectList="provinceList" @selected="getDistricts" />
                <BaseInputGroupSelect :requiredPlus="false" class="mb-1.5" label="Quận huyện" placeholderText="Chọn quận huyện" :selectList="districtList" />
                <BaseInputGroup class="mb-1.5" label="Mã số thuế" />
                <BaseTextareaGroup class="mb-1.5" label="Ghi chú" />
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
                    <div class="flex-grow flex">
                        <div class="flex flex-auto justify-around px-2 h-8 leading-6 border border-solid border-gray-300 rounded">
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
                <BaseInputGroupSelect @openModalAddNew="$emit('openModalNguonKhach')" class="mb-1.5" label="Nguồn khách" placeholderText="Chọn nguồn khách" :selectList="nguonKhachList" keywordFilter="TenNguonKhach" />
                <BaseInputGroup class="mb-1.5" label="Người giới thiệu" placeholderText="Khách hàng" />
                <BaseInputGroupSelect @openModalAddNew="$emit('openModalNhomKhach')" class="mb-1.5" label="Nhóm khách" placeholderText="Chọn nhóm" :selectList="nhomKhachList" keywordFilter="TenNhomDoiTuong" />
                <BaseInputGroupSelect @openModalAddNew="$emit('openModalTrangThaiKhach')" class="mb-1.5" label="Trạng thái khách" placeholderText="Chọn trạng thái" :selectList="trangThaiKhachList" keywordFilter="Name" />
                <BaseInputGroupSelectInfo class="mb-1.5" label="NV phụ trách" placeholderText="Chọn nhân viên" :selectList="nhanVienList" />
            </div>
        </template>
        <template v-slot:modal-footer>
            <slot name="modal-footer"></slot>
        </template>
    </BaseModal>
</template>

<script>
    import { ref } from '@vue/reactivity';
    import axios from 'axios';
    import BaseModal from '../BaseModal.vue';
    import BaseInputGroup from '../BaseInputGroup.vue';
    import BaseInputGroupSelect from '../BaseInputGroupSelect.vue';
    import BaseInputGroupSelectInfo from '../BaseInputGroupSelectInfo.vue';
    import BaseTextareaGroup from '../BaseTextareaGroup.vue';
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