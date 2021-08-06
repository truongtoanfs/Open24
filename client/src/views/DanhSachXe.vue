<template>
    <div class="p-3.5 xl:flex xl:pl-0 xl:pr-1">
        <div :class="isOpenSidebar ? 'block' : 'hidden'" class="xl:block xl:mr-1.5">
            <TheSidebar @closeSidebar="isOpenSidebar = false">
                <SidebarItemSearch class="mb-0.5" @openModal="isOpenModalHangXe = true" @openModalUpdate="isOpenModalUpdateHangXe = true" headerText="Hãng xe" searchLabel="Tìm kiếm hãng xe" :filterData="hangxeList">
                    <template v-slot:header-icon>
                        <i class="fab fa-fort-awesome"></i>
                    </template>
                    <template v-slot:modal-add-new>
                        <ModalHangXe v-if="isOpenModalHangXe" @closeModal="isOpenModalHangXe = false" modalTitle="Thêm mới hãng xe">
                            <template v-slot:modal-footer>
                                <ButtonCancel @click="isOpenModalHangXe = false" class="mr-2" />
                                <ButtonSave />
                            </template>
                        </ModalHangXe>
                    </template>
                    <template v-slot:modal-update>
                        <ModalHangXe v-if="isOpenModalUpdateHangXe" @closeModal="isOpenModalUpdateHangXe = false" modalTitle="Cập nhật hãng xe">
                            <template v-slot:modal-footer>
                                <ButtonCancel @click="isOpenModalUpdateHangXe = false" class="mr-2" />
                                <ButtonDelete class="mr-2" />
                                <ButtonSave />
                            </template>
                        </ModalHangXe>
                    </template>
                </SidebarItemSearch>

                <SidebarItemSearch class="mb-0.5" @openModal="isOpenModalLoaiXe = true" @openModalUpdate="isOpenModalUpdateLoaiXe = true" headerText="Loại xe" searchLabel="Tìm kiếm loại xe" :filterData="loaixeList">
                    <template v-slot:header-icon>
                        <i class="fas fa-truck-pickup"></i>
                    </template>
                    <template v-slot:modal-add-new>
                        <ModalLoaiXe v-if="isOpenModalLoaiXe" @closeModal="isOpenModalLoaiXe = false" modalTitle="Thêm mới loại xe">
                            <template v-slot:modal-footer>
                                <ButtonCancel @click="isOpenModalLoaiXe = false" class="mr-2" />
                                <ButtonSave />
                            </template>
                        </ModalLoaiXe>
                    </template>
                    <template v-slot:modal-update>
                        <ModalLoaiXe v-if="isOpenModalUpdateLoaiXe" @closeModal="isOpenModalUpdateLoaiXe = false" modalTitle="Cập nhật loại xe">
                            <template v-slot:modal-footer>
                                <ButtonCancel @click="isOpenModalUpdateLoaiXe = false" class="mr-2" />
                                <ButtonDelete class="mr-2" />
                                <ButtonSave />
                            </template>
                        </ModalLoaiXe>
                    </template>
                </SidebarItemSearch>

                <SidebarItemSearch class="mb-0.5" @openModal="isOpenModalMauXe = true" @openModalUpdate="isOpenModalUpdateMauXe = true" headerText="Mẫu xe" searchLabel="Tìm kiếm mẫu xe" :filterData="mauxeList">
                    <template v-slot:header-icon>
                        <i class="fas fa-car-side"></i>
                    </template>
                    <template v-slot:modal-add-new>
                        <ModalMauXe v-if="isOpenModalMauXe" @closeModal="isOpenModalMauXe = false" modalTitle="Thêm mới mẫu xe" :hangxeList="hangxeList" :loaixeList="loaixeList">
                            <template v-slot:modal-footer>
                                <ButtonCancel @click="isOpenModalMauXe = false" class="mr-2" />
                                <ButtonSave />
                            </template>
                        </ModalMauXe>
                    </template>
                    <template v-slot:modal-update>
                        <ModalMauXe v-if="isOpenModalUpdateMauXe" @closeModal="isOpenModalUpdateMauXe = false" modalTitle="Cập nhật mẫu xe" :hangxeList="hangxeList" :loaixeList="loaixeList">
                            <template v-slot:modal-footer>
                                <ButtonCancel @click="isOpenModalUpdateMauXe = false" class="mr-2" />
                                <ButtonDelete class="mr-2" />
                                <ButtonSave />
                            </template>
                        </ModalMauXe>
                    </template>
                </SidebarItemSearch>

                <SidebarItemCheckbox class="mb-0.5" headerText="Trạng thái">
                    <template v-slot:header-icon>
                        <i class="far fa-stop-circle"></i>
                    </template>
                    <template v-slot:content>
                        <BaseCheckbox label="Đang sử dụng" class="py-1" />
                        <BaseCheckbox label="Hủy" class="py-1" />
                    </template>
                </SidebarItemCheckbox>
            </TheSidebar>
        </div>
        <div class="w-full">
            <h1 class="text-xl font-bold mb-2.5">Danh mục Xe</h1>
            <div class="md:flex md:justify-between">
                <div class="relative flex items-center mb-3">
                    <div class="mr-1.5">
                        <BaseButton @click="isOpenModalThemMoiXe = true" class="bg-primary"><i class="fas fa-plus mr-0.5"></i> Thêm mới</BaseButton>
                        <ModalThemMoiXe @closeModal="isOpenModalThemMoiXe = false" v-if="isOpenModalThemMoiXe" :mauXeList="mauxeList" :hangXeList="hangxeList" :loaiXeList="loaixeList" />
                    </div>
                    <div class="mr-1.5">
                        <BaseButton @click="isOpenModalNhapFile = true" class="bg-primary"><i class="fas fa-download mr-0.5"></i> Nhập file</BaseButton>
                    </div>
                    <ModalNhapFile @closeModal="isOpenModalNhapFile = false" v-if="isOpenModalNhapFile" sectionName="danh sách xe" />
                    <div class="mr-1.5">
                        <BaseButton class="bg-primary"><i class="far fa-file-excel mr-0.5"></i> Xuất file</BaseButton>
                    </div>
                    <div class="mr-1.5 md:relative">
                        <BaseButton @click="isOpenDropdownColumn = true" class="bg-primary"><i class="fas fa-angle-double-down px-1.5"></i></BaseButton>
                        <ColumnList v-if="isOpenDropdownColumn" :columnList="columnList" />
                        <div v-if="isOpenDropdownColumn" @click="isOpenDropdownColumn = false" class="fixed inset-0 z-10"></div>
                    </div>
                </div>
                <div class="flex">
                    <BaseSeachBox class="w-full max-w-xs md:w-80" />
                    <BaseButton @click="isOpenSidebar = !isOpenSidebar" class="bg-primary ml-1.5 xl:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                        </svg>
                    </BaseButton>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import SidebarItemSearch from '../components/SidebarItemSearch.vue';
import SidebarItemCheckbox from '../components/SidebarItemCheckbox.vue';
import BaseSeachBox from '../components/BaseSearchBox.vue';
import BaseCheckbox from '../components/BaseCheckbox.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseModal from '../components/BaseModal.vue';
import ModalHangXe from '../components/ModalHangXe.vue';
import ModalLoaiXe from '../components/ModalLoaiXe.vue';
import ModalMauXe from '../components/ModalMauXe.vue';
import ModalThemMoiXe from '../components/ModalThemMoiXe.vue';
import ModalNhapFile from '../components/ModalNhapFile.vue';
import ButtonCancel from '../components/ButtonCancel.vue';
import ButtonSave from '../components/ButtonSave.vue';
import ButtonDelete from '../components/ButtonDelete.vue';
import ColumnList from '../components/ColumnList.vue';

import { ref, reactive, toRefs } from '@vue/reactivity';
    export default {
        components: {
            TheSidebar,
            SidebarItemSearch,
            SidebarItemCheckbox,
            BaseSeachBox,
            BaseCheckbox,
            BaseButton,
            ModalHangXe,
            ModalLoaiXe,
            ModalMauXe,
            ModalThemMoiXe,
            ModalNhapFile,
            ButtonCancel,
            ButtonSave,
            ButtonDelete,
            ColumnList,
        },
        emits: ["closeModal"],
        setup() {
            const hangxeList = ref([
                {
                    id: 1,
                    name: 'Vinfast',
                },
                {
                    id: 2,
                    name: 'Rolls-Rouce',
                },
                {
                    id: 3,
                    name: 'Mercedes-Benz',
                },
                {
                    id: 4,
                    name: 'Land Rover',
                },
                {
                    id: 5,
                    name: 'Bentley',
                },
                {
                    id: 6,
                    name: 'Lexus',
                },
                {
                    id: 7,
                    name: 'Jaguar',
                },
                {
                    id: 8,
                    name: 'BMW',
                },
                {
                    id: 9,
                    name: 'Audi',
                },
                {
                    id: 10,
                    name: 'Porsche',
                },
                {
                    id: 11,
                    name: 'Maserati',
                },
                {
                    id: 12,
                    name: 'Aston Martin',
                },
            ]);
            const loaixeList = ref([
                {
                    id: 1,
                    name: 'Sedan',
                },
                {
                    id: 2,
                    name: 'Hatchback',
                },
                {
                    id: 3,
                    name: 'Suv',
                },
                {
                    id: 4,
                    name: 'Crossover',
                },
                {
                    id: 5,
                    name: 'MPV',
                },
                {
                    id: 6,
                    name: 'Coupe',
                },
                {
                    id: 7,
                    name: 'Convertible',
                },
                {
                    id: 8,
                    name: 'Pickup',
                },
                {
                    id: 9,
                    name: 'Limousine',
                },
            ]);
            const mauxeList = ref([
                {
                    id: 1,
                    name: 'Lexus ES250',
                },
                {
                    id: 2,
                    name: 'Lexus RX300',
                },
                {
                    id: 3,
                    name: 'Lexus RX350',
                },
                {
                    id: 4,
                    name: 'BMW X5',
                },
                {
                    id: 5,
                    name: 'BMW X7',
                },
                {
                    id: 6,
                    name: 'Mercedes Benz GLC200',
                },
                {
                    id: 7,
                    name: 'Mercedes Benz GLC300',
                },
                {
                    id: 8,
                    name: 'Porsche Cayenne',
                },
                {
                    id: 9,
                    name: 'Porsche Macan',
                },
                {
                    id: 10,
                    name: 'Volvo XC60',
                },
                {
                    id: 11,
                    name: 'Volvo XC90',
                },
                {
                    id: 12,
                    name: ' Range Rover',
                },
            ]);
            const columnList = ref([
                {
                    id: 1,
                    name: 'Biển số',
                    checked: true,
                },
                {
                    id: 2,
                    name: 'Chủ xe',
                    checked: true,
                },
                {
                    id: 3,
                    name: 'Hãng xe',
                    checked: true,
                },
                {
                    id: 4,
                    name: 'Mẫu xe',
                    checked: true,
                },
                {
                    id: 5,
                    name: 'Số khung',
                    checked: false,
                },
                {
                    id: 6,
                    name: 'Màu sơn',
                    checked: true,
                },
                {
                    id: 7,
                    name: 'Hộp số',
                    checked: false,
                },
                {
                    id: 8,
                    name: 'Trạng thái',
                    checked: true,
                },
                {
                    id: 9,
                    name: 'Mã chủ xe',
                    checked: true,
                },
                {
                    id: 10,
                    name: 'Điện thoại',
                    checked: true,
                },
                {
                    id: 11,
                    name: 'Loại xe',
                    checked: true,
                },
                {
                    id: 12,
                    name: 'Năm sản xuất',
                    checked: true,
                },
                {
                    id: 13,
                    name: 'Số máy',
                    checked: false,
                },
                {
                    id: 14,
                    name: 'Dung tích',
                    checked: false,
                },
                {
                    id: 15,
                    name: 'ghi chú',
                    checked: true,
                },
            ]);

            const logoURL = ref('');
            const modalsState = reactive({
                isOpenModalHangXe: false,
                isOpenModalLoaiXe: false,
                isOpenModalMauXe: false,
                isOpenModalUpdateHangXe: false,
                isOpenModalUpdateLoaiXe: false,
                isOpenModalUpdateMauXe: false,
                isOpenModalThemMoiXe: false,
                isOpenModalNhapFile: false,
            })
            const isOpenSidebar = ref(false);
            const isOpenDropdownColumn = ref(false);
            function previewLogo(event) {
                const file = event.target.files[0];
                logoURL.value = URL.createObjectURL(file);
            }

            return {
                hangxeList,
                loaixeList,
                mauxeList,
                columnList,
                previewLogo,
                logoURL,
                ...toRefs(modalsState),
                isOpenSidebar,
                isOpenDropdownColumn,
            }
        }
    }

</script>

<style scoped>

</style>
