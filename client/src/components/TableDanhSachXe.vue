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
                <template v-for="(object, rowIndex) in rowsList" :key="rowIndex">
                    <tr @click="expandTable(rowIndex)" class="border-t border-gray-300 group">
                        <td :class="(activedRowIndex === rowIndex) ? 'bg-gray-200' : 'bg-open24-base'" class="open24-table-cell whitespace-nowrap group-hover:bg-gray-200" v-for="(element, cellIndex) in object.data" :key="cellIndex">{{ element }}</td>
                    </tr>
                    <tr v-if="activedRowIndex === rowIndex">
                        <td :colspan="columnList.length" class="bg-gray-200">
                            <div>
                                <button @click="activedTab = 'info'" :class="activedTab === 'info' ? 'bg-open24-base' : ''" class="px-3 py-2 rounded font-medium">Thông tin</button>
                                <button @click="activedTab = 'history'" :class="activedTab === 'history' ? 'bg-open24-base' : ''" class="px-3 py-2 rounded font-medium ">Lịch sử sửa chữa</button>
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
                                                <tr>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">HDSC0000000035</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">BG0000000023</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">16/07/2021 15:33</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">853,600</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">664,400</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">0</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">0</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">853,600</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">664,400</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-left">hello</td>
                                                </tr>
                                                <tr>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">HDSC0000000035</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">BG0000000023</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">16/07/2021 15:33</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">853,600</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">664,400</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">0</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">0</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">853,600</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">664,400</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-left">hello</td>
                                                </tr>
                                                <tr>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">HDSC0000000035</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">BG0000000023</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">16/07/2021 15:33</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">853,600</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">664,400</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">0</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">0</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">853,600</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">664,400</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-left">hello</td>
                                                </tr>
                                                <tr>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">HDSC0000000035</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">BG0000000023</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">16/07/2021 15:33</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">853,600</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">664,400</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">0</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">0</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">853,600</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-center">664,400</td>
                                                    <td class="open24-table-cell open24-table-cell-border text-left">hello</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <TablePagination :tableData="tableData" />
                                    <div class="py-3 flex items-center justify-end">
                                        <ButtonExport />
                                    </div>
                                </div>

                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <div class="bg-gray-400 bg-opacity-50 leading-6 py-2.5 px-3 md:flex md:items-center md:justify-between">
        <div class="flex items-center justify-center">
            <label class="font-medium mr-2">Số bản ghi:</label>
            <select v-model.number="selectedRecordValue" class="h-8 w-28 px-2 border border-gray-300 rounded focus:outline-none focus:shadow-md focus:border-blue-400" name="selectedRecordValue">
                <option v-for="(optionValue, optionIndex) in tableOptionsValue" :key="optionIndex" :value="optionValue">{{ optionValue }}</option>
            </select>
        </div>
        <div class="md:flex md:items-center">
            <div class="flex items-center justify-center text-open24-main my-2">
                <button @click="changeData(1)" :class="activedPaginationButton === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-open24-main hover:text-open24-accent'" class="px-3 h-7 rounded py-px"><i class="fas fa-step-backward"></i></button>
                <button @click="changeData(activedPaginationButton - 1)" :class="activedPaginationButton === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-open24-main hover:text-open24-accent'" class="px-3 h-7 rounded py-px text-sm"><i class="fas fa-caret-left"></i></button>
                <div>
                    <template v-for="buttonValue in paginationButtonList" :key="buttonValue" >
                        <button @click="changeData(buttonValue)" :class="activedPaginationButton === buttonValue ? 'bg-open24-main bg-open24-main-gradient text-open24-accent' : '' " class="px-3 mx-0.5 h-7 hover:bg-open24-main hover:text-open24-accent rounded py-px">{{ buttonValue }}</button>
                    </template>
                </div>
                <button @click="changeData(activedPaginationButton + 1)" :class="activedPaginationButton === paginationButtonList.length ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-open24-main hover:text-open24-accent'" class="px-3 h-7 rounded py-px text-sm"><i class="fas fa-caret-right"></i></button>
                <button @click="changeData(paginationButtonList.length)" :class="activedPaginationButton === paginationButtonList.length ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-open24-main hover:text-open24-accent'" class="px-3 h-7 rounded py-px"><i class="fas fa-step-forward"></i></button>
            </div>
            <p class="text-center ml-1">Hiển thị {{ tableMinRange }} - {{ tableMaxRange }} trên tổng số {{ tableData.length}} bản ghi</p>
        </div>
    </div>

</div>

</template>

<script>
import { ref, computed, watch } from 'vue';
import ButtonDelete from './ButtonDelete.vue';
import ButtonModify from './ButtonModify.vue';
import ButtonExport from './ButtonExport.vue';
import Accordition from './Accordition.vue';
import TablePagination from './Tablepagination.vue';
import { tableOptionsValue } from '../composables/useOptionsValue.js';


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
        const tableData = [
            {
                id: 1,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 2,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 3,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 4,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 5,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 6,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 7,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 8,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 9,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 10,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 11,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 12,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 13,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 14,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 15,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 16,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 17,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 18,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 19,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 20,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 21,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 22,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 23,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 24,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 25,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 26,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 27,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
            {
                id: 28,
                data: {
                    bienSo: '29A86868',
                    maChuXe: 'KH0000009',
                    chuXe: 'Nguyễn Nhật Linh',
                    dienThoai: '039933397',
                    hangXe: 'Toyota',
                    loaiXe: 'SUV',
                    mauXe: 'A-91',
                    namSanXuat: '2021',
                    soKhung: '17AFF4466999',
                    soMay: 'A123456',
                    mauSon: 'Đen',
                    dungTich: '300cc',
                    hopSo: 'Tự động',
                    ghiChu: 'Sửa chữa cẩn thận',
                    trangThai: 'Đang sử dụng'
                },
                info: [
                    {
                        id: 1,
                        name: 'Biển số xe:',
                        value: '29A86868',
                    },
                    {
                        id: 2,
                        name: 'Hãng xe:',
                        value: 'Toyota',
                    },
                    {
                        id: 3,
                        name: 'Loại xe:',
                        value: 'SUV',
                    },
                    {
                        id: 4,
                        name: 'Mẫu xe:',
                        value: 'A-91',
                    },
                    {
                        id: 5,
                        name: 'Màu sơn:',
                        value: 'Đen',
                    },
                    {
                        id: 6,
                        name: 'Số khung:',
                        value: '17AFF4466999',
                    },
                    {
                        id: 7,
                        name: 'Số máy:',
                        value: 'A123456',
                    },
                    {
                        id: 8,
                        name: 'Dung tích:',
                        value: '300cc',
                    },
                    {
                        id: 9,
                        name: 'Hộp số:',
                        value: 'Tự động',
                    },
                    {
                        id: 10,
                        name: 'Mã chủ xe:',
                        value: 'KH0000009',
                    },
                    {
                        id: 11,
                        name: 'Tên chủ xe:',
                        value: 'Nguyễn Nhật Linh',
                    },
                    {
                        id: 13,
                        name: 'Ngày sinh:',
                        value: '21/ 06/ 1092',
                    },
                    {
                        id: 14,
                        name: 'Điện thoại:',
                        value: '039933397',
                    },
                    {
                        id: 15,
                        name: 'Mã số thuế:',
                        value: '14ah3cxz',
                    },
                    {
                        id: 16,
                        name: 'Email:',
                        value: 'open24@gamil.com',
                    },
                    {
                        id: 17,
                        name: 'Địa chỉ:',
                        value: '31 Lê Văn Lương',
                    },
                    {
                        id: 18,
                        name: 'Quận/huyện:',
                        value: 'Bình Thạch',
                    },
                    {
                        id: 19,
                        name: 'Tỉnh/thành:',
                        value: 'Thành phố Hồ Chí Minh',
                    },
                    {
                        id: 20,
                        name: 'Ngày tạo:',
                        value: '10/08/2021 08:30',
                    },
                    {
                        id: 21,
                        name: 'Người tạo:',
                        value: 'Test',
                    },
                    {
                        id: 22,
                        name: 'Ghi chú:',
                        value: 'Sửa chữa cẩn thận',
                    },
                ]
            },
        ]

        const activedTab = ref('info');
        const activedRowIndex = ref(-1);//khởi tạo đóng tất cả các hàng
        const selectedRecordValue = ref(tableOptionsValue[0]);//giá trị đầu tiên trong d/s option
        const tableMaxRange = ref(tableOptionsValue[0]);
        const activedPaginationButton = ref(1);
        const tableMinRange = ref(1);
        const initialTableData = tableData.filter(object => object.id <= tableOptionsValue[0]);
        const rowsList = ref(initialTableData);
        const paginationButtonList = computed(function() {
            const paginationButtonAmount = Math.ceil(tableData.length / selectedRecordValue.value);
            const ButtonsArray = [];
            for (let i = 1; i <= paginationButtonAmount; i++) {
                ButtonsArray.push(i);
            }
            return ButtonsArray;
        })

        function expandTable(rowIndex) {
            activedRowIndex.value = activedRowIndex.value === rowIndex ? -1 : rowIndex;
            activedTab.value = 'info';
        }

        watch(selectedRecordValue, (newValue) => {
            activedPaginationButton.value = 1;
            rowsList.value = tableData.filter(object => {
                return 0 <= object.id && object.id <= newValue;
            })
            tableMinRange.value = rowsList.value[0].id;
            tableMaxRange.value = rowsList.value[rowsList.value.length - 1].id;
        })

        function changeData(buttonValue) {
            if (buttonValue < 1) {
                return;
            } else if (buttonValue > paginationButtonList.value.length) {
                return;
            }
            activedPaginationButton.value = buttonValue;
            rowsList.value = tableData.filter(object => {
                return selectedRecordValue.value * (buttonValue - 1) < object.id && object.id <= selectedRecordValue.value * buttonValue;
            })
            tableMinRange.value = rowsList.value[0].id;
            tableMaxRange.value = rowsList.value[rowsList.value.length - 1].id;
        }
        


        return {
            tableData,
            activedTab,
            activedRowIndex,
            expandTable,
            selectedRecordValue,
            rowsList,
            paginationButtonList,
            activedPaginationButton,
            changeData,
            tableMaxRange,
            tableMinRange,
            tableOptionsValue,
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
