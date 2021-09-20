<template>
<div>
    <div class="table-width table-height overflow-auto mt-2 md:mt-0">
        <table class="table">
            <thead>
                <tr>
                    <template v-for="(column, index) in columnList" :key="index">
                        <th v-if="column.colShow" class="table-th">{{ column.colText }}</th>
                    </template>
                </tr>
            </thead>
            <tbody>
                <template v-if="tableData.length > 0" v-for="(XeInfo, rowIndex) in tableData" :key="rowIndex">
                    <tr @click="expandTable(rowIndex)" class="table-tbody-tr">
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[0].colShow" >{{ XeInfo.BienSo }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[1].colShow" >{{ XeInfo.MaDoiTuong }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[2].colShow" >{{ XeInfo.TenDoiTuong }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[3].colShow" >{{ XeInfo.DienThoai }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[4].colShow" >{{ XeInfo.TenHangXe }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[5].colShow" >{{ XeInfo.TenLoaiXe }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[6].colShow" >{{ XeInfo.TenMauXe }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[7].colShow" >{{ XeInfo.NamSanXuat === 0 ? '' : XeInfo.NamSanXuat }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[8].colShow" >{{ XeInfo.SoKhung }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[9].colShow" >{{ XeInfo.SoMay }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[10].colShow" >{{ XeInfo.MauSon }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[11].colShow" >{{ XeInfo.DungTich }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[12].colShow" >{{ XeInfo.HopSo }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[13].colShow" >{{ XeInfo.GhiChu }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="table-td" v-if="columnList[14].colShow" >{{ XeInfo.TrangThai === 1 ? "Đang Sử dụng" : "Ngừng sử dụng" }}</td>
                    </tr>
                    <tr v-if="activedRowIndex === rowIndex">
                        <td :colspan="columnList.length" class="bg-gray-200">
                            <div>
                                <button @click="activedTab = 'info'" :class="activedTab === 'info' ? 'bg-open24-base' : ''" class="px-3 py-2 rounded font-medium">Thông tin</button>
                                <button @click="activedTab = 'history'" :class="activedTab === 'history' ? 'bg-open24-base' : ''" class="px-3 py-2 rounded font-medium ">Lịch sử sửa chữa</button>
                                <button @click="activedTab = 'diary'" :class="activedTab === 'diary' ? 'bg-open24-base' : ''" class="px-3 py-2 rounded font-medium ">Nhật ký bảo dưỡng</button>
                                <button @click="activedTab = 'schedule'" :class="activedTab === 'schedule' ? 'bg-open24-base' : ''" class="px-3 py-2 rounded font-medium ">Lịch bảo dưỡng</button>
                            </div>
                            <div class="bg-open24-base">
                                <div v-if="activedTab === 'info'" class="table-width px-6">
                                    <div class="pt-2 pb-4 md:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Biển số xe:</span>
                                            <span>{{ XeInfo.BienSo }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Hãng xe:</span>
                                            <span>{{ XeInfo.TenHangXe }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Loại xe:</span>
                                            <span>{{ XeInfo.TenLoaiXe }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Mẫu xe:</span>
                                            <span>{{ XeInfo.TenMauXe }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Màu sơn:</span>
                                            <span>{{ XeInfo.MauSon }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Số khung:</span>
                                            <span>{{ XeInfo.SoKhung }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Số máy:</span>
                                            <span>{{ XeInfo.SoMay }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Dung tích:</span>
                                            <span>{{ XeInfo.DungTich }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Hộp số:</span>
                                            <span>{{ XeInfo.HopSo }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Mã chủ xe:</span>
                                            <span>{{ XeInfo.MaDoiTuong }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Tên chủ xe:</span>
                                            <span>{{ XeInfo.TenDoiTuong }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Ngày sinh:</span>
                                            <span>{{ formatDate.getDate(XeInfo.NgaySinh_NgayTLap) }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Điện thoại:</span>
                                            <span>{{ XeInfo.DienThoai }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Mã số thuế:</span>
                                            <span>{{ XeInfo.MaSoThue }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Email:</span>
                                            <span>{{ XeInfo.Email }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Địa chỉ:</span>
                                            <span>{{ XeInfo.DiaChi }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Quận/huyện:</span>
                                            <span>{{ XeInfo.TenQuanHuyen }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Tỉnh/thành:</span>
                                            <span>{{ XeInfo.TenTinhTHanh }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Ngày tạo:</span>
                                            <span>{{ formatDate.getDateWithTime(XeInfo.NgayTao) }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Người tạo:</span>
                                            <span>{{ XeInfo.NguoiTao }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Ghi chú:</span>
                                            <span>{{ XeInfo.GhiChu }}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-end pb-3">
                                        <button-modify @click="activedUpdateModalIndex = rowIndex" />
                                        <modal-them-moi-xe v-if="activedUpdateModalIndex === rowIndex" :modalTitle="`Cập nhật xe ${XeInfo.BienSo}`" :updateXeData="XeInfo"
                                        @closeModal="activedUpdateModalIndex = -1" @openModalMauXe="$emit('openModalMauXe')" @openModalHangXe="$emit('openModalHangXe')" @openModalLoaiXe="$emit('openModalLoaiXe')" @openModalKhachHang="$emit('openModalKhachHang')" />
                                        <button-delete class="button-distance">xe {{ XeInfo.BienSo }}</button-delete>
                                    </div>
                                </div>
                                <div v-if="activedTab === 'history'" class="table-width px-3">
                                    <div class="overflow-auto pt-4">
                                        <table class="w-full">
                                            <thead>
                                                <tr>
                                                    <th class="table-th" rowspan="2">Mã hóa đơn</th>
                                                    <th class="table-th" rowspan="2">Mã báo giá</th>
                                                    <th class="table-th" rowspan="2">Ngày lập hóa đơn</th>
                                                    <th class="table-th border-b" colspan="2">Phải thanh toán</th>
                                                    <th class="table-th border-b" colspan="2">Đã thanh toán</th>
                                                    <th class="table-th border-b" colspan="2">Còn thiếu</th>
                                                    <th class="table-th" rowspan="2">Ghi chú</th>
                                                </tr>
                                                <tr>
                                                    <th class="table-th">Khách hàng</th>
                                                    <th class="table-th">Bảo hiểm</th>
                                                    <th class="table-th">Khách hàng</th>
                                                    <th class="table-th">Bảo hiểm</th>
                                                    <th class="table-th">Khách hàng</th>
                                                    <th class="table-th">Bảo hiểm</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in lichSuSuaChuaTableData.data" :key="item.ID" class="table-tbody-tr">
                                                    <td class="table-td">
                                                        <a @click="openModalHoaDon" class="cursor-pointer link-color">{{ item.MaHoaDon }}</a>
                                                    </td>
                                                    <td class="table-td">
                                                        <a @click="openModalBaoGia" class="cursor-pointer link-color">{{ item.MaBaoGia }}</a>
                                                    </td>
                                                    <td class="table-td">{{ formatDate.getDateWithTime(item.NgayLapHoaDon) }}</td>
                                                    <td class="table-td">{{ item.PhaiThanhToan }}</td>
                                                    <td class="table-td">{{ item.PhaiThanhToanBaoHiem }}</td>
                                                    <td class="table-td">{{ item.KhachDaTra }}</td>
                                                    <td class="table-td">{{ item.BaoHiemDaTra }}</td>
                                                    <td class="table-td">{{ item.TongThanhToan }}</td>
                                                    <td class="table-td">{{ item.TongTienBHDuyet }}</td>
                                                    <td class="table-td text-left">{{ item.ChiPhi_GhiChu }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <base-table-pagination :tablePaginationData="lichSuSuaChuaTableData" />
                                    <div class="py-3 flex items-center justify-end">
                                        <button-export />
                                    </div>
                                </div>
                                <div v-if="activedTab === 'diary'" class="table-width px-3">
                                    <div class="table-wrap pt-4">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th class="table-th">Mã hóa đơn</th>
                                                    <th class="table-th">Ngày bảo dưỡng</th>
                                                    <th class="table-th">Số km bảo dưỡng</th>
                                                    <th class="table-th">Mã hàng hóa</th>
                                                    <th class="table-th">Tên hàng hóa</th>
                                                    <th class="table-th">Số lượng</th>
                                                    <th class="table-th">Lần bảo dưỡng</th>
                                                    <th class="table-th">Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in nhatKyBaoDuongTableData.data" :key="item.ID" class="table-tbody-tr">
                                                    <td class="table-td text-center">{{ item.MaHoaDon }}</td>
                                                    <td class="table-td text-center">{{ formatDate.getDateWithTime(item.NgayLapHoaDon) }}</td>
                                                    <td class="table-td text-center">{{ item.SoKmVao }}</td>
                                                    <td class="table-td text-center">{{ item.MaHangHoa }}</td>
                                                    <td class="table-td text-center">{{ item.TenHangHoa }}</td>
                                                    <td class="table-td text-center">{{ item.SoLuong }}</td>
                                                    <td class="table-td text-center">{{ item.LanBaoDuong }}</td>
                                                    <td class="table-td text-center">{{ item.TrangThai }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <base-table-pagination :tablePaginationData="nhatKyBaoDuongTableData" />
                                </div>
                                <div v-if="activedTab === 'schedule'" class="table-width px-3">
                                    <div class="flex items-center justify-end px-2 pt-2">
                                        <base-checkbox label="Chưa xử lý" :value="true" />
                                        <base-checkbox label="Đã nhắc" class="ml-4" :value="true" />
                                    </div>
                                    <div class="table-wrap pt-1.5">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th class="table-th">Mã hàng hóa</th>
                                                    <th class="table-th">Tên hàng hóa</th>
                                                    <th class="table-th">Lần bảo dưỡng</th>
                                                    <th class="table-th">Số km bảo dưỡng</th>
                                                    <th class="table-th">Ngày bảo dưỡng</th>
                                                    <th class="table-th">Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in lichBaoDuongTableData.data" :key="item.ID" class="table-tbody-tr">
                                                    <td class="table-td text-center">{{ item.MaHangHoa }}</td>
                                                    <td class="table-td text-center">{{ item.TenHangHoa }}</td>
                                                    <td class="table-td text-center">{{ item.LanBaoDuong }}</td>
                                                    <td class="table-td text-center">{{ item.SoKmBaoDuong }}</td>
                                                    <td class="table-td text-center">{{ formatDate.getDateWithTime(item.NgayBaoDuongDuKien) }}</td>
                                                    <td class="table-td text-center">{{ item.sTrangThai }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <base-table-pagination :tablePaginationData="lichBaoDuongTableData" />
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>
                <tr v-else>
                    <td :colspan="columnList.length">
                        <p class="text-center py-1">Không có dữ liệu</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <base-table-pagination :tablePaginationData="danhSachXeTableData" />
    <!-- modals section -->
    <modal-bao-gia :isModalHoaDon="true" v-if="isOpenModalHoaDon" modalTitle="Hóa đơn" :data="hoaDonData"
    @closeModal="isOpenModalHoaDon = false" @openModalChiTietXuatKho="openModalChiTietXuatKho" @openModalChietKhauNhanVien="openModalChietKhauNhanVien" />
    <modal-chi-tiet-xuat-kho v-if="isOpenModalChiTietXuatKho" :data="chiTietXuatKhoData"
    @closeModal="isOpenModalChiTietXuatKho = false" />
    <modal-chiet-khau-nhan-vien v-if="isOpenModalChietKhauNhanVien" :data="chietKhauNhanVienData"
    @closeModal="isOpenModalChietKhauNhanVien = false" />
    <modal-bao-gia v-if="isOpenModalBaoGia" modalTitle="Báo giá" :data="baoGiaData"
    @closeModal="isOpenModalBaoGia = false" />
</div>

</template>

<script>
import ButtonDelete from '../buttons/ButtonDelete.vue';
import ButtonModify from '../buttons/ButtonModify.vue';
import ButtonExport from '../buttons/ButtonExport.vue';
import ButtonCancel from '../buttons/ButtonCancel.vue';
import ButtonSave from '../buttons/ButtonSave.vue';
import BaseTablePagination from '../base/BaseTablePagination.vue';
import ModalThemMoiXe from '../modals/ModalThemMoiXe.vue';
import ModalBaoGia from '../modals/ModalBaoGia.vue';
import ModalChiTietXuatKho from '../modals/ModalChiTietXuatKho.vue';
import ModalChietKhauNhanVien from '../modals/ModalChietKhauNhanVien.vue';
import BaseCheckbox from '../base/BaseCheckbox.vue';
import { formatDate } from '/Open24/client/src/composables/useFormatDate';
import { reactive, ref, toRefs, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { Get_InforHoaDon_byID, HDSC_GetChiTietXuatKho, Get_InforBaoGia_byID } from '../../data';

export default {
    props: {
        tableData: Array,
        columnList: Array,
    },
    emits: ['openModalMauXe', 'openModalHangXe', 'openModalLoaiXe', 'openModalKhachHang'],
    components: {
        ButtonDelete,
        ButtonModify,
        ButtonExport,
        ButtonCancel,
        ButtonSave,
        BaseTablePagination,
        ModalThemMoiXe,
        BaseCheckbox,
        ModalBaoGia,
        ModalChiTietXuatKho,
        ModalChietKhauNhanVien,
    },
    setup(props) {
        const store = useStore();
        store.dispatch('getLichSuSuaChuaTableData');
        store.dispatch('getNhatKyBaoDuongTableData');
        store.dispatch('getLichBaoDuongTableData');

        const danhSachXeTableData = computed(() => {
            return store.getters.danhSachXeTableData;
        })
        const lichSuSuaChuaTableData = computed(() => {
            return store.getters.lichSuSuaChuaTableData;
        })
        const nhatKyBaoDuongTableData = computed(() => {
            return store.getters.nhatKyBaoDuongTableData;
        })
        const lichBaoDuongTableData = computed(() => {
            return store.getters.lichBaoDuongTableData;
        })

        const activedTab = ref('info');
        const activedRowIndex = ref(-1);//khởi tạo đóng tất cả các hàng
        function expandTable(rowIndex) {
            activedRowIndex.value = activedRowIndex.value === rowIndex ? -1 : rowIndex;
            activedTab.value = 'info';
        }

        const activedUpdateModalIndex = ref(-1);

        const modalStateTracking = reactive({
            isOpenModalHoaDon: false,
            isOpenModalChiTietXuatKho: false,
            isOpenModalChietKhauNhanVien: false,
            isOpenModalBaoGia: false,
        });
        
        const hoaDonData = ref({});
        function openModalHoaDon() {
            hoaDonData.value = Get_InforHoaDon_byID;
            modalStateTracking.isOpenModalHoaDon = true;
        }

        const chiTietXuatKhoData = ref([]);
        function openModalChiTietXuatKho() {
            if(chiTietXuatKhoData.value.length === 0) {
                HDSC_GetChiTietXuatKho.dataSoure.forEach(item => {
                    chiTietXuatKhoData.value.push(...(item.CTXuats));
                });
            }
            modalStateTracking.isOpenModalChiTietXuatKho = true;
        }

        const chietKhauNhanVienData = ref({})
        function openModalChietKhauNhanVien(data) {
            chietKhauNhanVienData.value = data;
            modalStateTracking.isOpenModalChietKhauNhanVien = true;
        }

        const baoGiaData = ref({})
        function openModalBaoGia() {
            baoGiaData.value = Get_InforBaoGia_byID;
            modalStateTracking.isOpenModalBaoGia = true;
        }

        return {
            ...toRefs(modalStateTracking),
            danhSachXeTableData,
            activedTab,
            activedRowIndex,
            activedUpdateModalIndex,
            expandTable,
            lichSuSuaChuaTableData,
            nhatKyBaoDuongTableData,
            lichBaoDuongTableData,
            formatDate,
            openModalHoaDon,
            openModalChiTietXuatKho,
            openModalChietKhauNhanVien,
            openModalBaoGia,
            hoaDonData,
            chiTietXuatKhoData,
            chietKhauNhanVienData,
            baoGiaData,
        }
    }
}
</script>

<style scoped>
    .table-width {
        width: calc(100vw - 28px);
    }
    .table-height {
        max-height: calc(100vh - 250px);
    }
    @media screen and (min-width: 1280px) {
        .table-width {
            width: calc(100vw - 256px);
        }
    }

    .open24-table-cell {
        @apply py-1.5 px-2;
    }
    .open24-table-cell-border {
        @apply border-b border-gray-300;
    }

</style>