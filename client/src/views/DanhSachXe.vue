<template>
    <layout-main>
        <template #sidebar="{ isCollapseAll }">
            <sidebar-item-search class="mb-0.5" headerText="Hãng xe" searchLabel="Tìm kiếm hãng xe" :isCollapseAll="isCollapseAll" :filterData="hangXeList"
                @openModal="isOpenModalHangXe = true" @openModalUpdate="openModalUpdateHangXe">
                <template #header-icon>
                    <i class="fab fa-fort-awesome"></i>
                </template>
                <template #update-modal="{ updateData , activedItemIndex }">
                    <modal-hang-xe :isUpdateModal="true" v-if="activedHangXeModal === activedItemIndex" @closeModal="activedHangXeModal = -1" modalTitle="Cập nhật hãng xe" :maHangXe="updateData.maHangXe" :tenHangXe="updateData.name" :imageUrl="updateData.logo" />
                </template>
            </sidebar-item-search>

            <sidebar-item-search class="mb-0.5" headerText="Loại xe" searchLabel="Tìm kiếm loại xe" :isCollapseAll="isCollapseAll" :filterData="loaiXeList"
                @openModal="isOpenModalLoaiXe = true" @openModalUpdate="openModalUpdateLoaiXe">
                <template #header-icon>
                    <i class="fas fa-truck-pickup"></i>
                </template>
                <template #update-modal="{ updateData , activedItemIndex }">
                    <modal-loai-xe :isUpdateModal="true" v-if="activedLoaiXeModal === activedItemIndex" @closeModal="activedLoaiXeModal = -1" modalTitle="Cập nhật loại xe" :maLoaiXe="updateData.maLoaiXe" :tenLoaiXe="updateData.name" />
                </template>
            </sidebar-item-search>

            <sidebar-item-search class="mb-0.5" headerText="Mẫu Xe" searchLabel="Tìm kiếm mẫu xe" :isCollapseAll="isCollapseAll" :filterData="mauXeList"
                @openModal="isOpenModalMauXe = true" @openModalUpdate="openModalUpdateMauXe">
                <template #header-icon>
                    <i class="fab fa-fort-awesome"></i>
                </template>
                <template #update-modal="{ updateData , activedItemIndex }">
                    <modal-mau-xe :isUpdateModal="true" v-if="activedMauXeModal === activedItemIndex" modalTitle="Cập nhật mẫu xe" :tenMauXe="updateData.name" :tenHangXe="updateData.tenHangXe" :tenLoaiXe="updateData.tenLoaiXe" :ghiChu="updateData.ghiChu" :hangXeList="hangXeList" :loaiXeList="loaiXeList"
                    @closeModal="activedMauXeModal = -1" @openModalHangXe="isOpenModalHangXe = true" @openModalLoaiXe="isOpenModalLoaiXe = true" />
                </template>
            </sidebar-item-search>

            <sidebar-item-checkbox class="mb-0.5" headerText="Trạng thái" :isCollapseAll="isCollapseAll">
                <template #header-icon>
                    <i class="far fa-stop-circle"></i>
                </template>
                <template #content>
                    <base-checkbox label="Đang sử dụng" class="pt-2" />
                    <base-checkbox label="Hủy" class="pt-2 pb-1" />
                </template>
            </sidebar-item-checkbox>
        </template>

        <template #page-title>
            <page-title titleText="Danh mục xe" />
        </template>

        <template #control-buttons-group>
            <button-add-new @click="isOpenModalThemMoiXe = true" />
            <button-import @click="isOpenModalNhapFile = true" class="button-distance" />
            <button-export class="button-distance" />
            <button-control-column class="button-distance" :columnList="columnList" />
        </template>

        <template #table-search>
            <base-search-box class="w-full max-w-xs md:w-80" contentSearch="Theo mã, tên, biển số, số điện thoại" />
        </template>
        
        <template #main-table>
            <table-danh-sach-xe :columnList="columnList" :hangXeList="hangXeList" :loaiXeList="loaiXeList" :mauXeList="mauXeList" :chuXeList="chuXeList"
            @openModalMauXe="isOpenModalMauXe = true" @openModalHangXe="isOpenModalHangXe = true" @openModalLoaiXe="isOpenModalLoaiXe = true" @openModalKhachHang="isOpenModalKhachHang = true"/>
        </template>
        <!-- Section Modals -->
        <template #modal-section>
            <modal-hang-xe v-if="isOpenModalHangXe" @closeModal="isOpenModalHangXe = false" modalTitle="Thêm mới hãng xe" />
            <modal-loai-xe v-if="isOpenModalLoaiXe" @closeModal="isOpenModalLoaiXe = false" modalTitle="Thêm mới loại xe" />
            <modal-mau-xe v-if="isOpenModalMauXe" modalTitle="Thêm mới mẫu xe" :hangXeList="hangXeList" :loaiXeList="loaiXeList"
            @closeModal="isOpenModalMauXe = false" @openModalHangXe="isOpenModalHangXe = true" @openModalLoaiXe="isOpenModalLoaiXe = true" />
            <modal-them-moi-xe v-if="isOpenModalThemMoiXe" modalTitle="Thêm mới xe" :mauXeList="mauXeList" :hangXeList="hangXeList" :loaiXeList="loaiXeList" :chuXeList="chuXeList"
            @closeModal="isOpenModalThemMoiXe = false" @openModalMauXe="isOpenModalMauXe = true" @openModalHangXe="isOpenModalHangXe = true" @openModalLoaiXe="isOpenModalLoaiXe = true" @openModalKhachHang="isOpenModalKhachHang = true" />
            <modal-khach-hang v-if="isOpenModalKhachHang" modalTitle="Thêm mới khách hàng" :nguonKhachList="nguonKhachList" :nhomKhachList="nhomKhachList" :trangThaiKhachList="trangThaiKhachList"  :nhanVienList="nhanVienList"
            @closeModal="isOpenModalKhachHang = false" @openModalNguonKhach="isOpenModalNguonKhach = true" @openModalNhomKhach ="isOpenModalNhomKhach = true" @openModalTrangThaiKhach="isOpenModalTrangThaiKhach = true"  />
            <modal-nguon-khach v-if="isOpenModalNguonKhach" @closeModal="isOpenModalNguonKhach = false" modalTitle="Thêm mới nguồn khách" />
            <modal-nhom-khach v-if="isOpenModalNhomKhach" @closeModal="isOpenModalNhomKhach = false" modalTitle="Thêm mới nhóm khách hàng" />
            <modal-trang-thai-khach v-if="isOpenModalTrangThaiKhach" @closeModal="isOpenModalTrangThaiKhach = false" modalTitle="Thêm mới trạng thái" />
            <modal-nhap-file v-if="isOpenModalNhapFile" sectionName="danh mục xe" @closeModal="isOpenModalNhapFile = false" />
        </template>
    </layout-main>
</template>

<script>
import LayoutMain from '../layout/LayoutMain.vue';
import SidebarItemSearch from '../components/sidebar/SidebarItemSearch.vue';
import SidebarItemCheckbox from '../components/sidebar/SidebarItemCheckbox.vue';
import BaseCheckbox from '../components/base/BaseCheckbox.vue';
import PageTitle from '../components/PageTitle.vue';
import ButtonAddNew from '../components/buttons/ButtonAddNew.vue';
import ButtonImport from '../components/buttons/ButtonImport.vue';
import ButtonExport from '../components/buttons/ButtonExport.vue';
import ButtonControlColumn from '../components/buttons/ButtonControlColumn.vue';
import BaseSearchBox from '../components/base/BaseSearchBox.vue';
import TableDanhSachXe from '../components/tables/TableDanhSachXe.vue';
import ModalHangXe from '../components/modals/ModalHangXe.vue';
import ModalLoaiXe from '../components/modals/ModalLoaiXe.vue';
import ModalMauXe from '../components/modals/ModalMauXe.vue';
import ModalThemMoiXe from '../components/modals/ModalThemMoiXe.vue';
import ModalKhachHang from '../components/modals/ModalKhachHang.vue';
import ModalNguonKhach from '../components/modals/ModalNguonKhach.vue';
import ModalNhomKhach from '../components/modals/ModalNhomKhach.vue';
import ModalTrangThaiKhach from '../components/modals/ModalTrangThaiKhach.vue';
import ModalNhapFile from '../components/modals/ModalNhapFile.vue';
import { GetAllHangXes } from '../data';
import { GetAllLoaiXes } from '../data';
import { GetAllDanhMucMauXe } from '../data';
import { GetChuXeList } from '../data';
import { GetDM_NguonKhach } from '../data';
import { GetNhomDoiTuong_DonVi } from '../data';
import { GetTrangThaiTimKiem } from '../data';

import { ref, reactive, toRefs } from 'vue';

export default {
    components: {
        LayoutMain,
        SidebarItemSearch,
        SidebarItemCheckbox,
        BaseCheckbox,
        PageTitle,
        ButtonAddNew,
        ButtonImport,
        ButtonExport,
        ButtonControlColumn,
        BaseSearchBox,
        TableDanhSachXe,
        ModalHangXe,
        ModalLoaiXe,
        ModalMauXe,
        ModalThemMoiXe,
        ModalKhachHang,
        ModalNhapFile,
        ModalNguonKhach,
        ModalNhomKhach,
        ModalTrangThaiKhach,
    },
    setup() {
        const hangXeList = GetAllHangXes.dataSoure.map(hangXe => {
            return {
                id: hangXe.ID,
                maHangXe: hangXe.MaHangXe,
                name: hangXe.TenHangXe,
                logo: hangXe.Logo,
                trangThai: hangXe.TrangThai,
            }
        })

        const loaiXeList = GetAllLoaiXes.dataSoure.map(loaiXe => {
            return {
                id: loaiXe.ID,
                maLoaiXe: loaiXe.MaLoaiXe,
                name: loaiXe.TenLoaiXe,
                trangThai: loaiXe.TrangThai,
            }
        })

        const mauXeList = GetAllDanhMucMauXe.dataSoure.map(mauXe => {
            return {
                id: mauXe.ID,
                name: mauXe.TenMauXe,
                id_hangXe: mauXe.ID_HangXe,
                id_loaiXe: mauXe.ID_LoaiXe,
                tenLoaiXe: mauXe.TenLoaiXe,
                tenHangXe: mauXe.TenHangXe,
                ghiChu: mauXe.GhiChu,
                trangThai: mauXe.TrangThai,
            }
        })

        const chuXeList = GetChuXeList.map(chuXe => {
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

        const stateTracking = reactive({
            isOpenModalHangXe: false,
            isOpenModalLoaiXe: false,
            isOpenModalMauXe: false,
            isOpenModalThemMoiXe: false,
            isOpenModalKhachHang: false,
            isOpenModalNguonKhach: false,
            isOpenModalNhomKhach: false,
            isOpenModalTrangThaiKhach: false,
            isOpenModalNhapFile: false,
        })

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

        return {
            ...toRefs(stateTracking),
            hangXeList,
            loaiXeList,
            mauXeList,
            chuXeList,
            nguonKhachList,
            nhomKhachList,
            trangThaiKhachList,
            nhanVienList,
            activedHangXeModal,
            openModalUpdateHangXe,
            activedLoaiXeModal,
            openModalUpdateLoaiXe,
            activedMauXeModal,
            openModalUpdateMauXe,
            columnList,
        }
    }
}
</script> 