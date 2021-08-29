<template>
<div>
    <div class="table-width table-height overflow-auto mt-2 md:mt-0">
        <table>
            <thead>
                <tr>
                    <template v-for="column in columnList" :key="column.id">
                        <th v-if="column.colShow" class="bg-gray-300 open24-table-cell whitespace-nowrap sticky top-0 border-r border-white last:border-0">{{ column.colText }}</th>
                    </template>
                </tr>
            </thead>
            <tbody>
                <template v-for="(object, rowIndex) in tableData" :key="rowIndex">
                    <tr @click="expandTable(rowIndex)" class="border-t border-gray-300 group">
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[0].colShow" >{{ object.BienSo }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[1].colShow" >{{ object.MaDoiTuong }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[2].colShow" >{{ object.TenDoiTuong }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[3].colShow" >{{ object.DienThoai }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[4].colShow" >{{ object.TenHangXe }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[5].colShow" >{{ object.TenLoaiXe }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[6].colShow" >{{ object.TenMauXe }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[7].colShow" >{{ object.NamSanXuat === 0 ? '' : object.NamSanXuat }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[8].colShow" >{{ object.SoKhung }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[9].colShow" >{{ object.SoMay }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[10].colShow" >{{ object.MauSon }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[11].colShow" >{{ object.DungTich }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[12].colShow" >{{ object.HopSo }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[13].colShow" >{{ object.GhiChu }}</td>
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-if="columnList[14].colShow" >{{ object.TrangThai === 1 ? "Đang Sử dụng" : "Ngừng sử dụng" }}</td>
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
                                <div v-if="activedTab === 'info'" class="table-width px-6 ">
                                    <div class="pt-2 pb-4 md:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Biển số xe:</span>
                                            <span>{{ object.BienSo }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Hãng xe:</span>
                                            <span>{{ object.TenHangXe }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Loại xe:</span>
                                            <span>{{ object.TenLoaiXe }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Mẫu xe:</span>
                                            <span>{{ object.TenMauXe }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Màu sơn:</span>
                                            <span>{{ object.MauSon }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Số khung:</span>
                                            <span>{{ object.SoKhung }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Số máy:</span>
                                            <span>{{ object.SoMay }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Dung tích:</span>
                                            <span>{{ object.DungTich }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Hộp số:</span>
                                            <span>{{ object.HopSo }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Mã chủ xe:</span>
                                            <span>{{ object.MaDoiTuong }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Tên chủ xe:</span>
                                            <span>{{ object.TenDoiTuong }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Ngày sinh:</span>
                                            <span>{{ object.NgaySinh_NgayTLap }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Điện thoại:</span>
                                            <span>{{ object.DienThoai }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Mã số thuế:</span>
                                            <span>{{ object.MaSoThue }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Email:</span>
                                            <span>{{ object.Email }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Địa chỉ:</span>
                                            <span>{{ object.DiaChi }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Quận/huyện:</span>
                                            <span>{{ object.TenQuanHuyen }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Tỉnh/thành:</span>
                                            <span>{{ object.TenTinhTHanh }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Ngày tạo:</span>
                                            <span>{{ object.NgayTao }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Người tạo:</span>
                                            <span>{{ object.NguoiTao }}</span>
                                        </div>
                                        <div class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">Ghi chú:</span>
                                            <span>{{ object.GhiChu }}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-end pb-3">
                                        <ButtonModify @click="activedUpdateModalIndex = rowIndex" />
                                        <BaseModalThemMoiXe v-if="activedUpdateModalIndex === rowIndex" :modalTitle="`Cập nhật xe ${object.BienSo}`"
                                            @closeModal="activedUpdateModalIndex = -1"
                                            @openModalMauXe="$emit('openModalMauXe')" @openModalHangXe="$emit('openModalHangXe')" @openModalLoaiXe="$emit('openModalLoaiXe')" @openModalKhachHang="$emit('openModalKhachHang')"
                                            :updateXeData="object" :hangxeList="hangxeList" :loaixeList="loaixeList" :mauxeList="mauxeList" :chuxeList="chuxeList" >
                                            <template v-slot:modal-footer>
                                                <button-cancel @closeModal="activedUpdateModalIndex = -1" />
                                                <button-save class="btn-distance" />
                                            </template>
                                        </BaseModalThemMoiXe>
                                        <ButtonDelete class="btn-distance">xe {{ object.BienSo }}</ButtonDelete>
                                    </div>
                                </div>
                                <div v-if="activedTab === 'history'" class="table-width px-3">
                                    <div class="overflow-auto pt-4">
                                        <table class="w-full">
                                            <thead>
                                                <tr>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white" rowspan="2">Mã hóa đơn</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white" rowspan="2">Mã báo giá</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white" rowspan="2">Ngày lập hóa đơn</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white" colspan="2">Phải thanh toán</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white" colspan="2">Đã thanh toán</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white" colspan="2">Còn thiếu</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white" rowspan="2">Ghi chú</th>
                                                </tr>
                                                <tr>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Khách hàng</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Bảo hiểm</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Khách hàng</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Bảo hiểm</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Khách hàng</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Bảo hiểm</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in historyData" :key="item.ID">
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.MaHoaDon }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.MaBaoGia }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.NgayLapHoaDon }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.PhaiThanhToan }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.PhaiThanhToanBaoHiem }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.KhachDaTra }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.BaoHiemDaTra }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.TongThanhToan }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.TongTienBHDuyet }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-left">{{ item.ChiPhi_GhiChu }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <TablePagination :paginationButtonList="historyPaginationButtonList" :pageView="historyPageView" :totalPages="historyTotalPages" />
                                    <div class="py-3 flex items-center justify-end">
                                        <ButtonExport />
                                    </div>
                                </div>
                                <div v-if="activedTab === 'diary'" class="table-width px-3">
                                    <div class="overflow-auto pt-4">
                                        <table class="w-full">
                                            <thead>
                                                <tr>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">mã hóa đơn</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Ngày bảo dưỡng</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Số km bảo dưỡng</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Mã hàng hóa</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Tên hàng hóa</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Số lượng</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Lần bảo dưỡng</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in historyData" :key="item.ID">
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.MaHoaDon }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.MaBaoGia }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.NgayLapHoaDon }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.PhaiThanhToan }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.PhaiThanhToanBaoHiem }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.KhachDaTra }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.BaoHiemDaTra }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.TongThanhToan }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <TablePagination :paginationButtonList="historyPaginationButtonList" :pageView="historyPageView" :totalPages="historyTotalPages" />
                                </div>
                                <div v-if="activedTab === 'schedule'" class="table-width px-3">
                                    <div class="flex items-center justify-end px-2 pt-2">
                                        <BaseCheckbox label="Chưa xử lý" :value="true" />
                                        <BaseCheckbox label="Đã nhắc" class="ml-4" :value="true" />
                                    </div>
                                    <div class="overflow-auto pt-1.5">
                                        <table class="w-full">
                                            <thead>
                                                <tr>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Mã hàng hóa</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Tên hàng hóa</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Lần bảo dưỡng</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Số km bảo dưỡng</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Ngày bảo dưỡng</th>
                                                    <th class="bg-gray-300 open24-table-cell whitespace-nowrap border border-white">Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in scheduleData" :key="item.ID">
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.MaHangHoa }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.TenHangHoa }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.LanBaoDuong }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.SoKmBaoDuong }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.NgayBaoDuongDuKien }}</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">{{ item.sTrangThai }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <TablePagination :paginationButtonList="schedulePaginationButtonList" :pageView="schedulePageView" :totalPages="scheduleTotalPages" />
                                </div>

                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <TablePagination :paginationButtonList="paginationButtonList" :pageView="pageView" :totalPages="totalPages"  />
</div>

</template>

<script>
import ButtonDelete from './ButtonDelete.vue';
import ButtonModify from './ButtonModify.vue';
import ButtonExport from './ButtonExport.vue';
import ButtonCancel from './ButtonCancel.vue';
import ButtonSave from './ButtonSave.vue';
import Accordition from './Accordition.vue';
import TablePagination from './Tablepagination.vue';
import BaseModalThemMoiXe from './danhSachXe/BaseModalThemMoiXe.vue';
import BaseCheckbox from './BaseCheckbox.vue';
import { ref, watch } from 'vue';
import { GetListGaraDanhMucXe_v1 } from '../data';
import { Gara_GetListHoaDonSuaChua_v2 } from "../data";
import { Gara_GetListNhatKyBaoDuongTheoXe } from "../data";
import { Gara_GetListLichBaoDuongTheoXe } from "../data";


export default {
    props: {
        columnList: Array,
        hangxeList: Array,
        loaixeList: Array,
        mauxeList: Array,
        chuxeList: Array,
    },
    emits: ['openModalMauXe', 'openModalHangXe', 'openModalLoaiXe', 'openModalKhachHang'],
    components: {
        ButtonDelete,
        ButtonModify,
        ButtonExport,
        ButtonCancel,
        ButtonSave,
        Accordition,
        TablePagination,
        BaseModalThemMoiXe,
        BaseCheckbox,
    },
    setup(props) {
        const tableData = GetListGaraDanhMucXe_v1.dataSoure.data;
        const paginationButtonList = GetListGaraDanhMucXe_v1.dataSoure.ListPage;
        const pageView = GetListGaraDanhMucXe_v1.dataSoure.PageView;
        const totalPages = GetListGaraDanhMucXe_v1.dataSoure.NumberOfPage;

        
        const activedTab = ref('info');
        const activedRowIndex = ref(-1);//khởi tạo đóng tất cả các hàng
        function expandTable(rowIndex) {
            activedRowIndex.value = activedRowIndex.value === rowIndex ? -1 : rowIndex;
            activedTab.value = 'info';
        }

        const activedUpdateModalIndex = ref(-1);

        const historyData = Gara_GetListHoaDonSuaChua_v2.dataSoure.data;
        const historyPaginationButtonList = Gara_GetListHoaDonSuaChua_v2.dataSoure.ListPage;
        const historyPageView = Gara_GetListHoaDonSuaChua_v2.dataSoure.PageView;
        const historyTotalPages = Gara_GetListHoaDonSuaChua_v2.dataSoure.NumberOfPage;

        const diaryData = Gara_GetListNhatKyBaoDuongTheoXe.dataSoure.data;
        const diaryPaginationButtonList = Gara_GetListNhatKyBaoDuongTheoXe.dataSoure.ListPage;
        const diaryPageView = Gara_GetListNhatKyBaoDuongTheoXe.dataSoure.PageView;
        const diaryTotalPages = Gara_GetListNhatKyBaoDuongTheoXe.dataSoure.NumberOfPage;
        
        const scheduleData = Gara_GetListLichBaoDuongTheoXe.dataSoure.data;
        const schedulePaginationButtonList = Gara_GetListLichBaoDuongTheoXe.dataSoure.ListPage;
        const schedulePageView = Gara_GetListLichBaoDuongTheoXe.dataSoure.PageView;
        const scheduleTotalPages = Gara_GetListLichBaoDuongTheoXe.dataSoure.NumberOfPage;

        return {
            tableData,
            totalPages,
            pageView,
            activedTab,
            activedRowIndex,
            activedUpdateModalIndex,
            paginationButtonList,
            expandTable,
            historyData,
            historyPaginationButtonList,
            historyPageView,
            historyTotalPages,
            diaryData,
            diaryPaginationButtonList,
            diaryPageView,
            diaryTotalPages,
            scheduleData,
            schedulePaginationButtonList,
            schedulePageView,
            scheduleTotalPages,
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
        @apply leading-6 py-1 px-2;
    }
    .open24-table-cell-border {
        @apply border-b border-gray-300;
    }

    
</style>
