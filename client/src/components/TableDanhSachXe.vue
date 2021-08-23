<template>
<div>
    <div class="table-width table-height overflow-auto mt-2 md:mt-0">
        <table>
            <thead>
                <tr>
                    <template v-for="column in columnList" :key="column.id">
                        <th class="bg-gray-300 open24-table-cell whitespace-nowrap sticky top-0 border-r border-white last:border-0">{{ column.name }}</th>
                    </template>
                </tr>
            </thead>
            <tbody>
                <template v-for="(object, rowIndex) in tableData" :key="rowIndex">
                    <tr @click="expandTable(rowIndex)" class="border-t border-gray-300 group">
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-for="(element, cellIndex) in object.data" :key="cellIndex">{{ element }}</td>
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
                                        <div v-for="(infoItem, index) in object.info" :key="index" class="flex items-center open24-table-cell open24-table-cell-border">
                                            <span class="block w-32">{{infoItem.name}}</span>
                                            <span>{{ infoItem.value }}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-end pb-3">
                                        <ButtonModify class="mr-2" />
                                        <ButtonDelete>xe {{ object.data.bienSo }}</ButtonDelete>
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
                                    <div class="overflow-auto pt-4">
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
import Accordition from './Accordition.vue';
import TablePagination from './Tablepagination.vue';
import { ref } from 'vue';
import { GetListGaraDanhMucXe_v1 } from '../data';
import { Gara_GetListHoaDonSuaChua_v2 } from "../data";
import { Gara_GetListNhatKyBaoDuongTheoXe } from "../data";
import { Gara_GetListLichBaoDuongTheoXe } from "../data";


export default {
    props: {
        columnList: Array,
    },
    components: {
        ButtonDelete,
        ButtonModify,
        ButtonExport,
        Accordition,
        TablePagination
    },
    setup() {
        const tableData = GetListGaraDanhMucXe_v1.dataSoure.data.map(item => {
            return {
                data: {
                    bienSo: item.BienSo,
                    maChuXe: item.MaDoiTuong,
                    chuXe: item.TenDoiTuong,
                    dienThoai: item.DienThoai,
                    hangXe: item.TenHangXe,
                    loaiXe: item.TenLoaiXe,
                    mauXe: item.TenMauXe,
                    namSanXuat: item.NamSanXuat === 0 ? '' : item.NamSanXuat,
                    soKhung: item.SoKhung,
                    soMay: item.SoMay,
                    mauSon: item.MauSon,
                    dungTich: item.DungTich,
                    hopSo: item.HopSo,
                    ghiChu: item.GhiChu,
                    trangThai: item.TrangThai === 1 ? "Đang Sử dụng" : "Ngừng sử dụng",
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: item.BienSo,
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: item.TenHangXe,
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: item.TenLoaiXe,
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: item.TenMauXe,
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: item.MauSon,
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: item.SoKhung,
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: item.SoMay,
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: item.DungTich,
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: item.HopSo,
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: item.MaDoiTuong,
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: item.TenDoiTuong,
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: item.NgaySinh_NgayTLap,
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: item.DienThoai,
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: item.MaSoThue,
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: item.Email,
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: item.DiaChi,
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: item.TenQuanHuyen,
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: item.TenTinhTHanh,
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: item.NgayTao,
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: item.NguoiTao,
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: item.GhiChu,
                    },
                ]
            }
        })
        const paginationButtonList = GetListGaraDanhMucXe_v1.dataSoure.ListPage;
        const pageView = GetListGaraDanhMucXe_v1.dataSoure.PageView;
        const totalPages = GetListGaraDanhMucXe_v1.dataSoure.NumberOfPage;

        const activedTab = ref('info');
        const activedRowIndex = ref(-1);//khởi tạo đóng tất cả các hàng
        function expandTable(rowIndex) {
            activedRowIndex.value = activedRowIndex.value === rowIndex ? -1 : rowIndex;
            activedTab.value = 'info';
        }

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
