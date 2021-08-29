<template>
    <div class="p-3.5 xl:flex xl:pl-0">
        <TheSidebar :class="[isOpenSidebar ? 'block' : 'hidden', 'xl:block xl:mr-1.5']" @closeSidebar="isOpenSidebar = false" :isCollapseAll="isCollapseAll" @collapseAll="isCollapseAll = !isCollapseAll">
            <SidebarItemSearch :isCollapseAll="isCollapseAll" class="mb-0.5" @openModal="isOpenModalHangXe = true" @openModalUpdate="openModalUpdateHangXe" headerText="Hãng xe" searchLabel="Tìm kiếm hãng xe" :filterData="hangxeList" keywordFilter="TenHangXe">
                <template v-slot:header-icon>
                    <i class="fab fa-fort-awesome"></i>
                </template>
                <template v-slot:update-modal="{updateData , activedItemIndex}">
                    <BaseModalHangXe v-if="activedHangXeModal === activedItemIndex" @closeModal="activedHangXeModal = -1" modalTitle="Cập nhật hãng xe" :maHangXe="updateData.MaHangXe" :tenHangXe="updateData.TenHangXe" :imageUrl="updateData.Logo" >
                        <template v-slot:modal-footer>
                            <ButtonCancel @click="activedHangXeModal = -1" class="mr-2" />
                            <ButtonDelete class="mr-2">hãng {{ updateData.TenHangXe }}</ButtonDelete>
                            <ButtonSave />
                        </template>
                    </BaseModalHangXe>
                </template>
            </SidebarItemSearch>

            <SidebarItemSearch :isCollapseAll="isCollapseAll" class="mb-0.5" @openModal="isOpenModalLoaiXe = true" @openModalUpdate="openModalUpdateLoaiXe" headerText="Loại xe" searchLabel="Tìm kiếm loại xe" :filterData="loaixeList" keywordFilter="TenLoaiXe">
                <template v-slot:header-icon>
                    <i class="fas fa-truck-pickup"></i>
                </template>
                <template v-slot:update-modal="{updateData , activedItemIndex}">
                    <BaseModalLoaiXe v-if="activedLoaiXeModal === activedItemIndex" @closeModal="activedLoaiXeModal = -1" modalTitle="Cập nhật loại xe" :maLoaiXe="updateData.MaLoaiXe" :tenLoaiXe="updateData.TenLoaiXe">
                        <template v-slot:modal-footer>
                            <ButtonCancel @click="activedLoaiXeModal = -1" class="mr-2" />
                            <ButtonDelete class="mr-2">{{ updateData.TenLoaiXe }}</ButtonDelete>
                            <ButtonSave />
                        </template>
                    </BaseModalLoaiXe>
                </template>
            </SidebarItemSearch>

            <SidebarItemSearch :isCollapseAll="isCollapseAll" class="mb-0.5" @openModal="isOpenModalMauXe = true" @openModalUpdate="openModalUpdateMauXe" headerText="Mẫu xe" searchLabel="Tìm kiếm mẫu xe" :filterData="mauxeList" keywordFilter="TenMauXe">
                <template v-slot:header-icon>
                    <i class="fas fa-truck-pickup"></i>
                </template>
                <template v-slot:update-modal="{updateData , activedItemIndex}">
                    <BaseModalMauXe v-if="activedMauXeModal === activedItemIndex" @closeModal="activedMauXeModal = -1" @openModalHangXe="isOpenModalHangXe = true" @openModalLoaiXe="isOpenModalLoaiXe = true" modalTitle="Cập nhật mẫu xe" :tenMauXe="updateData.TenMauXe" :tenHangXe="updateData.TenHangXe" :tenLoaiXe="updateData.TenLoaiXe" :ghiChu="updateData.GhiChu" :hangxeList="hangxeList" :loaixeList="loaixeList" >
                        <template v-slot:modal-footer>
                            <ButtonCancel @click="activedMauXeModal = -1" class="mr-2" />
                            <ButtonDelete class="mr-2">{{ updateData.TenMauXe }}</ButtonDelete>
                            <ButtonSave />
                        </template>
                    </BaseModalMauXe>
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
            <TableDanhSachXe :columnList="columnList" :hangxeList="hangxeList" :loaixeList="loaixeList" :mauxeList="mauxeList" :chuxeList="chuxeList"
                @openModalMauXe="isOpenModalMauXe = true" @openModalHangXe="isOpenModalHangXe = true" @openModalLoaiXe="isOpenModalLoaiXe = true" @openModalKhachHang="isOpenModalKhachHang = true" />
        </div>

        <BaseModalHangXe v-if="isOpenModalHangXe" @closeModal="isOpenModalHangXe = false" modalTitle="Thêm mới hãng xe" >
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalHangXe = false" class="mr-2" />
                <ButtonSave />
            </template>
        </BaseModalHangXe>

        <BaseModalLoaiXe v-if="isOpenModalLoaiXe" @closeModal="isOpenModalLoaiXe = false" modalTitle="Thêm mới loại xe">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalLoaiXe = false" class="mr-2" />
                <ButtonSave />
            </template>
        </BaseModalLoaiXe>

        <BaseModalMauXe v-if="isOpenModalMauXe" @closeModal="isOpenModalMauXe = false" @openModalHangXe="isOpenModalHangXe = true" @openModalLoaiXe="isOpenModalLoaiXe = true" modalTitle="Thêm mới mẫu xe" :hangxeList="hangxeList" :loaixeList="loaixeList">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalMauXe = false" class="mr-2" />
                <ButtonSave />
            </template>
        </BaseModalMauXe>

        <BaseModalThemMoiXe v-if="isOpenModalThemMoiXe" modalTitle="Thêm mới xe" @closeModal="isOpenModalThemMoiXe = false"
            @openModalMauXe="isOpenModalMauXe = true" @openModalHangXe="isOpenModalHangXe = true" @openModalLoaiXe="isOpenModalLoaiXe = true" @openModalKhachHang="isOpenModalKhachHang = true" 
            :mauxeList="mauxeList" :hangxeList="hangxeList" :loaixeList="loaixeList" :chuxeList="chuxeList">
                <template v-slot:modal-footer>
                    <ButtonCancel @click="isOpenModalThemMoiXe = false" />
                    <ButtonSave class="btn-distance" />
                </template>
        </BaseModalThemMoiXe>

        <BaseModalKhachHang v-if="isOpenModalKhachHang" @closeModal="isOpenModalKhachHang = false" modalTitle="Thêm mới khách hàng" :nguonKhachList="nguonKhachList" :nhomKhachList="nhomKhachList" :trangThaiKhachList="trangThaiKhachList"  :nhanVienList="nhanVienList"
        @openModalNguonKhach="isOpenModalNguonKhach = true" @openModalTrangThaiKhach="isOpenModalTrangThaiKhach = true" @openModalNhomKhach ="isOpenModalNhomKhach = true">
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenModalKhachHang = false" class="mr-2" />
                <ButtonSave />
            </template>
        </BaseModalKhachHang>

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
import BaseModalHangXe from '../components/danhSachXe/BaseModalHangXe.vue';
import BaseModalLoaiXe from '../components/danhSachXe/BaseModalLoaiXe.vue';
import BaseModalMauXe from '../components/danhSachXe/BaseModalMauXe.vue';
import BaseModalThemMoiXe from '../components/danhSachXe/BaseModalThemMoiXe.vue';
import BaseModalKhachHang from '../components/danhSachXe/BaseModalKhachHang.vue';


import { ref, reactive, toRefs } from '@vue/reactivity';
import { GetAllHangXes } from '../data';
import { GetAllLoaiXes } from '../data';
import { GetAllDanhMucMauXe } from '../data';
import { GetChuXeList } from '../data';
import { GetDM_NguonKhach } from '../data';
import { GetNhomDoiTuong_DonVi } from '../data';
import { GetTrangThaiTimKiem } from '../data';
import { watch } from '@vue/runtime-core';

export default {
    components: {
        TheSidebar,
        SidebarItemSearch,
        SidebarItemCheckbox,
        BaseSeachBox,
        BaseCheckbox,
        BaseButton,
        BaseModalKhachHang,
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
        BaseModalHangXe,
        BaseModalLoaiXe,
        BaseModalMauXe,
        BaseModalThemMoiXe,
    },
    emits: ["closeModal"],
    setup() {
        const hangxeList = GetAllHangXes.dataSoure;
        const loaixeList = GetAllLoaiXes.dataSoure;
        const mauxeList = GetAllDanhMucMauXe.dataSoure;
        const chuxeList = GetChuXeList.map(chuXe => {
            return {
                id: chuXe.ID,
                code: chuXe.MaNguoiNop,
                name: chuXe.NguoiNopTien,
                phoneNumber: chuXe.SoDienThoai,
                email: chuXe.Email,
                diaChi: chuXe.DiaChi,
                idNhomDoiTuongs: chuXe.IDNhomDoiTuongs,
            }
        });

        const nguonKhachList = GetDM_NguonKhach;
        const nhomKhachList = GetNhomDoiTuong_DonVi.data;


        const columnList = ref([
            {
                "colName": "colBienSo",
                "colText": "Biển số",
                "colShow": true,
                "index": 0
            },
            {
                "colName": "colMaChuXe",
                "colText": "Mã chủ xe",
                "colShow": true,
                "index": 1
            },
            {
                "colName": "colChuXe",
                "colText": "Chủ xe",
                "colShow": true,
                "index": 2
            },
            {
                "colName": "colDienThoai",
                "colText": "Điện thoại",
                "colShow": false,
                "index": 3
            },
            {
                "colName": "colHangXe",
                "colText": "Hãng xe",
                "colShow": true,
                "index": 4
            },
            {
                "colName": "colLoaiXe",
                "colText": "Loại xe",
                "colShow": true,
                "index": 5
            },
            {
                "colName": "colMauXe",
                "colText": "Mẫu xe",
                "colShow": true,
                "index": 6
            },
            {
                "colName": "colNamSanXuat",
                "colText": "Năm sản xuất",
                "colShow": true,
                "index": 7
            },
            {
                "colName": "colSoKhung",
                "colText": "Số khung",
                "colShow": true,
                "index": 8
            },
            {
                "colName": "colSoMay",
                "colText": "Số máy",
                "colShow": true,
                "index": 9
            },
            {
                "colName": "colMauSon",
                "colText": "Màu sơn",
                "colShow": true,
                "index": 10
            },
            {
                "colName": "colDungTich",
                "colText": "Dung tích",
                "colShow": true,
                "index": 11
            },
            {
                "colName": "colHopSo",
                "colText": "Hộp số",
                "colShow": true,
                "index": 12
            },
            {
                "colName": "colGhiChu",
                "colText": "Ghi chú",
                "colShow": true,
                "index": 13
            },
            {
                "colName": "colTrangThai",
                "colText": "Trạng thái",
                "colShow": false,
                "index": 14
            }
        ]);
        if (!localStorage.DanhMucXeColumnList) {
            localStorage.setItem("DanhMucXeColumnList", JSON.stringify(columnList.value));
        } else {
            columnList.value = JSON.parse(localStorage.DanhMucXeColumnList);
        }

        watch(columnList, (newValue) => {
            localStorage.setItem("DanhMucXeColumnList", JSON.stringify(columnList.value));
        }, { deep: true })

        const trangThaiKhachList = GetTrangThaiTimKiem.dataSoure.ttkhachhang;
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
        
        const activedHangXeModal = ref(-1);
        function openModalUpdateHangXe(index) {
            activedHangXeModal.value = index;
        }
        const activedLoaiXeModal = ref(-1);
        function openModalUpdateLoaiXe(index) {
            activedLoaiXeModal.value = index;
        }
        const activedMauXeModal = ref(-1);
        function openModalUpdateMauXe(index) {
            activedMauXeModal.value = index;
        }


        return {
            hangxeList,
            loaixeList,
            mauxeList,
            columnList,
            chuxeList,
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
            openModalUpdateHangXe,
            activedHangXeModal,
            openModalUpdateLoaiXe,
            activedLoaiXeModal,
            openModalUpdateMauXe,
            activedMauXeModal
        }
    }
}

</script>

<style scoped>

</style>
