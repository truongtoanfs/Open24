<template>
    <div class="p-3.5 xl:flex xl:pl-0">
        <TheSidebar :class="[isOpenSidebar ? 'block' : 'hidden', 'xl:block xl:mr-1.5']" @closeSidebar="isOpenSidebar = false" :isCollapseAll="isCollapseAll" @collapseAll="isCollapseAll = !isCollapseAll">
            <SidebarItemSearch :isCollapseAll="isCollapseAll" class="mb-0.5" @openModal="isOpenModalHangXe = true" @openModalUpdate="isOpenModalUpdateHangXe = true" headerText="Hãng xe" searchLabel="Tìm kiếm hãng xe" :filterData="hangxeList">
                <template v-slot:header-icon>
                    <i class="fab fa-fort-awesome"></i>
                </template>
            </SidebarItemSearch>

            <SidebarItemSearch :isCollapseAll="isCollapseAll" class="mb-0.5" @openModal="isOpenModalLoaiXe = true" @openModalUpdate="isOpenModalUpdateLoaiXe = true" headerText="Loại xe" searchLabel="Tìm kiếm loại xe" :filterData="loaixeList">
                <template v-slot:header-icon>
                    <i class="fas fa-truck-pickup"></i>
                </template>
            </SidebarItemSearch>

            <SidebarItemSearch :isCollapseAll="isCollapseAll" class="mb-0.5" @openModal="isOpenModalMauXe = true" @openModalUpdate="isOpenModalUpdateMauXe = true" headerText="Mẫu xe" searchLabel="Tìm kiếm mẫu xe" :filterData="mauxeList">
                <template v-slot:header-icon>
                    <i class="fas fa-car-side"></i>
                </template>
            </SidebarItemSearch>

            <SidebarItemCheckbox :isCollapseAll="isCollapseAll" class="mb-0.5" headerText="Trạng thái">
                <template v-slot:header-icon>
                    <i class="far fa-stop-circle"></i>
                </template>
                <template v-slot:content>
                    <BaseCheckbox label="Đang sử dụng" class="py-1" />
                    <BaseCheckbox label="Hủy" class="py-1" />
                </template>
            </SidebarItemCheckbox>
        </TheSidebar>
        <div class="w-full">
            <h1 class="text-xl font-bold mb-2.5">Danh mục Xe</h1>
            <div class="md:flex md:justify-between">
                <div class="relative flex items-center mb-3">
                    <div class="mr-1.5">
                        <ButtonAddNew @click="isOpenModalThemMoiXe = true" />
                        <ModalThemMoiXe v-if="isOpenModalThemMoiXe" @closeModal="isOpenModalThemMoiXe = false"
                            @openModalMauXe="isOpenModalMauXe = true" @openModalHangXe="isOpenModalHangXe = true" @openModalLoaiXe="isOpenModalLoaiXe = true" @openModalKhachHang="isOpenModalKhachHang = true" 
                            :mauXeList="mauxeList" :hangXeList="hangxeList" :loaiXeList="loaixeList" :khachHangList="khachHangList">
                                <template v-slot:modal-footer>
                                    <ButtonCancel @click="isOpenModalThemMoiXe = false" class="mr-2" />
                                    <ButtonSave />
                                </template>
                        </ModalThemMoiXe>
                    </div>
                    <div class="mr-1.5">
                        <ButtonImport @click="isOpenModalNhapFile = true" />
                        <ModalNhapFile @closeModal="isOpenModalNhapFile = false" v-if="isOpenModalNhapFile" sectionName="danh sách xe" />
                    </div>
                    <div class="mr-1.5">
                        <ButtonExport />
                    </div>
                    <div class="mr-1.5 md:relative">
                        <BaseButton @click="isOpenDropdownColumn = true" class="bg-open24-main bg-open24-main-gradient hover:bg-none"><i class="fas fa-angle-double-down px-1.5"></i></BaseButton>
                        <DropdownColumnList v-if="isOpenDropdownColumn" :columnList="columnList" />
                        <div v-if="isOpenDropdownColumn" @click="isOpenDropdownColumn = false" class="overlay"></div>
                    </div>
                </div>
                <div class="flex">
                    <BaseSeachBox class="w-full max-w-xs md:w-80" />
                    <BaseButton @click="isOpenSidebar = !isOpenSidebar" class="bg-open24-main bg-open24-main-gradient hover:bg-none ml-1.5 xl:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                        </svg>
                    </BaseButton>
                </div>
            </div>
            <TableDanhSachXe :columnList="columnList" />
        </div>

        <ModalHangXe v-if="isOpenModalHangXe" @closeModal="isOpenModalHangXe = false" modalTitle="Thêm mới hãng xe">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalHangXe = false" class="mr-2" />
                <ButtonSave />
            </template>
        </ModalHangXe>
        <ModalHangXe v-if="isOpenModalUpdateHangXe" @closeModal="isOpenModalUpdateHangXe = false" modalTitle="Cập nhật hãng xe">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalUpdateHangXe = false" class="mr-2" />
                <ButtonDelete class="mr-2" />
                <ButtonSave />
            </template>
        </ModalHangXe>

        <ModalLoaiXe v-if="isOpenModalLoaiXe" @closeModal="isOpenModalLoaiXe = false" modalTitle="Thêm mới loại xe">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalLoaiXe = false" class="mr-2" />
                <ButtonSave />
            </template>
        </ModalLoaiXe>
        <ModalLoaiXe v-if="isOpenModalUpdateLoaiXe" @closeModal="isOpenModalUpdateLoaiXe = false" modalTitle="Cập nhật loại xe">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalUpdateLoaiXe = false" class="mr-2" />
                <ButtonDelete class="mr-2" />
                <ButtonSave />
            </template>
        </ModalLoaiXe>

        <ModalMauXe v-if="isOpenModalMauXe" @closeModal="isOpenModalMauXe = false" @openModalHangXe="isOpenModalHangXe = true" @openModalLoaiXe="isOpenModalLoaiXe = true" modalTitle="Thêm mới mẫu xe" :hangxeList="hangxeList" :loaixeList="loaixeList">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalMauXe = false" class="mr-2" />
                <ButtonSave />
            </template>
        </ModalMauXe>
        <ModalMauXe v-if="isOpenModalUpdateMauXe" @closeModal="isOpenModalUpdateMauXe = false" modalTitle="Cập nhật mẫu xe" :hangxeList="hangxeList" :loaixeList="loaixeList">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalUpdateMauXe = false" class="mr-2" />
                <ButtonDelete class="mr-2" />
                <ButtonSave />
            </template>
        </ModalMauXe>

        <ModalKhachHang v-if="isOpenModalKhachHang" @closeModal="isOpenModalKhachHang = false" modalTitle="Thêm mới khách hàng" :nguonKhachList="nguonKhachList" :nhomKhachList="nhomKhachList" :trangThaiKhachList="trangThaiKhachList"  :nhanVienList="nhanVienList"
        @openModalNguonKhach="isOpenModalNguonKhach = true" @openModalTrangThaiKhach="isOpenModalTrangThaiKhach = true" @openModalNhomKhach ="isOpenModalNhomKhach = true">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalKhachHang = false" class="mr-2" />
                <ButtonSave />
            </template>
        </ModalKhachHang>

        <ModalNguonKhach v-if="isOpenModalNguonKhach" @closeModal="isOpenModalNguonKhach = false" modalTitle="Thêm mới nguồn khách">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalNguonKhach = false" class="mr-2" />
                <ButtonSave />
            </template>
        </ModalNguonKhach>
        <ModalTrangThaiKhach v-if="isOpenModalTrangThaiKhach" @closeModal="isOpenModalTrangThaiKhach = false" modalTitle="Thêm mới trạng thái">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalTrangThaiKhach = false" class="mr-2" />
                <ButtonSave />
            </template>
        </ModalTrangThaiKhach>
        <ModalNhomKhach v-if="isOpenModalNhomKhach" @closeModal="isOpenModalNhomKhach = false" modalTitle="Thêm mới nhóm khách hàng">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalNhomKhach = false" class="mr-2" />
                <ButtonSave />
            </template>
        </ModalNhomKhach>
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
import ModalKhachHang from '../components/ModalKhachHang.vue';
import ModalThemMoiXe from '../components/ModalThemMoiXe.vue';
import ModalNguonKhach from '../components/ModalNguonKhach.vue';
import ModalNhomKhach from '../components/ModalNhomKhach.vue';
import ModalTrangThaiKhach from '../components/ModalTrangThaiKhach.vue';
import ModalNhapFile from '../components/ModalNhapFile.vue';
import ButtonCancel from '../components/ButtonCancel.vue';
import ButtonSave from '../components/ButtonSave.vue';
import ButtonDelete from '../components/ButtonDelete.vue';
import ButtonAddNew from '../components/ButtonAddNew.vue';
import ButtonImport from '../components/ButtonImport.vue';
import ButtonExport from '../components/ButtonExport.vue';
import DropdownColumnList from '../components/DropdownColumnList.vue';
import TableDanhSachXe from '../components/TableDanhSachXe.vue';

import { ref, reactive, toRefs } from '@vue/reactivity';
import axios from 'axios';

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
        ModalKhachHang,
        ModalThemMoiXe,
        ModalNguonKhach,
        ModalNhomKhach,
        ModalTrangThaiKhach,
        ModalNhapFile,
        ButtonCancel,
        ButtonSave,
        ButtonDelete,
        ButtonAddNew,
        ButtonImport,
        ButtonExport,
        DropdownColumnList,
        TableDanhSachXe,
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
                name: 'Trường Hải',
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
                name: 'Mã chủ xe',
                checked: true,
            },
            {
                id: 3,
                name: 'Chủ xe',
                checked: true,
            },
            {
                id: 4,
                name: 'Điện thoại',
                checked: true,
            },
            {
                id: 5,
                name: 'Hãng xe',
                checked: true,
            },
            {
                id: 6,
                name: 'Loại xe',
                checked: true,
            },
            {
                id: 7,
                name: 'Mẫu xe',
                checked: true,
            },
            {
                id: 8,
                name: 'Năm sản xuất',
                checked: true,
            },
            {
                id: 9,
                name: 'Số khung',
                checked: false,
            },
            {
                id: 10,
                name: 'Số máy',
                checked: false,
            },
            {
                id: 11,
                name: 'Màu sơn',
                checked: true,
            },
            {
                id: 12,
                name: 'Dung tích',
                checked: false,
            },
            {
                id: 13,
                name: 'Hộp số',
                checked: false,
            },
            {
                id: 14,
                name: 'ghi chú',
                checked: true,
            },
            {
                id: 15,
                name: 'Trạng thái',
                checked: true,
            },
        ]);

        const khachHangList = ref([
            {
                id: 1,
                code: 'KH000027',
                name: 'Nguyễn Duy Dương',
                phoneNumber: '0906586355'

            },
            {
                id: 2,
                code: 'KH0000009',
                name: 'Trương Thảo Linh',
                phoneNumber: ''

            },
            {
                id: 3,
                code: 'KH0000011',
                name: 'Dương Minh Quang',
                phoneNumber: '0382963813'

            },
            {
                id: 4,
                code: 'KH0000032',
                name: 'Trần Thu Hà',
                phoneNumber: '0936895531'

            },
            {
                id: 5,
                code: 'KH0000030',
                name: 'Phạm Mỹ Dung',
                phoneNumber: '0963858965'

            },
            {
                id: 6,
                code: 'KH000027',
                name: 'Nguyễn Duy Dương',
                phoneNumber: '0906586355'

            },
            {
                id: 7,
                code: 'KH0000009',
                name: 'Trương Thảo Linh',
                phoneNumber: ''

            },
            {
                id: 8,
                code: 'KH0000011',
                name: 'Dương Minh Quang',
                phoneNumber: '0382963813'

            },
            {
                id: 9,
                code: 'KH0000032',
                name: 'Trần Thu Hà',
                phoneNumber: '0936895531'

            },
            {
                id: 10,
                code: 'KH0000030',
                name: 'Phạm Mỹ Dung',
                phoneNumber: '0963858965'

            },
        ])
        const nguonKhachList = ref([
            {
                id: 1,
                name: 'Khách tiềm năng',
            },
            {
                id: 2,
                name: 'Khách lâu năm',
            }
        ])
        const nhomKhachList = ref([
            {
                id: 1,
                name: 'Nhóm 1',
            },
            {
                id: 2,
                name: 'Nhóm 2',
            }
        ])
        const trangThaiKhachList = ref([
            {
                id: 1,
                name: 'Tự do',
            },
            {
                id: 2,
                name: 'Cố định',
            }
        ])
        const nhanVienList = ref([
            {
                id: 1,
                code: 'NV001',
                name: 'Nguyễn Duy Dương',
                phoneNumber: '0906586355'

            },
            {
                id: 2,
                code: 'NV002',
                name: 'Trương Thảo Linh',
                phoneNumber: ''

            },
            {
                id: 3,
                code: 'NV003',
                name: 'Dương Minh Quang',
                phoneNumber: '0382963813'

            },
            {
                id: 4,
                code: 'NV004',
                name: 'Trần Thu Hà',
                phoneNumber: '0936895531'

            },
            {
                id: 5,
                code: 'NV005',
                name: 'Phạm Mỹ Dung',
                phoneNumber: ''

            },
        ])

        const logoURL = ref('');
        const modalsState = reactive({
            isOpenModalHangXe: false,
            isOpenModalLoaiXe: false,
            isOpenModalMauXe: false,
            isOpenModalKhachHang: false,
            isOpenModalUpdateHangXe: false,
            isOpenModalUpdateLoaiXe: false,
            isOpenModalUpdateMauXe: false,
            isOpenModalThemMoiXe: false,
            isOpenModalNhapFile: false,
            isOpenModalNguonKhach: false,
            isOpenModalNhomKhach: false,
            isOpenModalTrangThaiKhach: false,
        })
        const isOpenSidebar = ref(false);
        const isOpenDropdownColumn = ref(false);
        const isCollapseAll = ref(false);
        function previewLogo(event) {
            const file = event.target.files[0];
            logoURL.value = URL.createObjectURL(file);
        }


        return {
            hangxeList,
            loaixeList,
            mauxeList,
            columnList,
            khachHangList,
            previewLogo,
            logoURL,
            ...toRefs(modalsState),
            isOpenSidebar,
            isOpenDropdownColumn,
            nguonKhachList,
            nhomKhachList,
            trangThaiKhachList,
            isCollapseAll,
            nhanVienList,
        }
    }
}

</script>

<style scoped>

</style>
