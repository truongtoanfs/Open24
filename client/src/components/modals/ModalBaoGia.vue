<template>
    <base-modal modalSize="lg" @closeModal="$emit('closeModal')">
        <template #modal-title>{{ modalTitle }}</template>
        <template #modal-content>
            <div class="lg:grid grid-cols-2">
                <div class="item-wrap">
                    <span class="item-label">Mã hóa đơn:</span>
                    <span class="item-value">{{ data.MaHoaDon }}</span>
                </div>
                <div class="item-wrap">
                    <span class="item-label">Khách hàng:</span>
                    <span class="item-value">{{ data.TenDoiTuong }} ({{ data.MaDoiTuong }})</span>
                </div>
                <div v-if="isModalHoaDon" class="item-wrap">
                    <span class="item-label">Bảo hiểm:</span>
                    <span class="item-value">{{ data.MaBaoHiem }}</span>
                </div>
                <div class="item-wrap">
                    <span class="item-label">Bảng giá:</span>
                    <span class="item-value">{{ data.TenBangGia }}</span>
                </div>
                <div class="item-wrap">
                    <span class="item-label">Ghi chú:</span>
                    <span class="item-value">{{ data.DienGiai }}</span>
                </div>
                <div class="item-wrap">
                    <span class="item-label">Thời gian:</span>
                    <span class="item-value">{{ formatDate.getDateWithTime(data.NgayLapHoaDon) }}</span>
                </div>
                <div class="item-wrap">
                    <span class="item-label">Trạng thái:</span>
                    <span class="item-value">{{ data.TrangThai }}</span>
                </div>
                <div class="item-wrap">
                    <span class="item-label">Chi nhánh:</span>
                    <span class="item-value">{{ data.TenDonVi }}</span>
                </div>
                <div class="item-wrap">
                    <span class="item-label">Người bán:</span>
                    <span class="item-value">{{ data.TenNhanVien }}</span>
                </div>
                <div class="item-wrap">
                    <span class="item-label">Người tạo:</span>
                    <span class="item-value">{{ data.NguoiTaoHD }}</span>
                </div>
            </div>
            <div class="mt-4 overflow-auto font-normal">
                <table class="w-full border-b border-gray-300">
                    <thead>
                        <tr>
                            <th class="table-th">Mã hàng hóa</th>
                            <th class="table-th">Tên hàng</th>
                            <th class="table-th" v-if="isModalHoaDon">Đã xuất/SL</th>
                            <th class="table-th" v-else>Số lượng</th>
                            <th class="table-th">Đơn giá</th>
                            <th class="table-th">Chiết khấu</th>
                            <th class="table-th">Tiền thuế</th>
                            <th class="table-th">Thanh toán</th>
                            <th class="table-th text-center" v-if="isModalHoaDon">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in data.BH_HoaDon_ChiTiet" :key="index" class="table-tbody-tr">
                            <td class="table-td">{{ item.MaHangHoa }}</td>
                            <td class="table-td">{{ item.TenHangHoa }}</td>
                            <td class="table-td text-center relative">
                                {{ item.SoLuong }}
                                <i v-if="item.ThanhPhan_DinhLuong" @click="$emit('openModalChiTietXuatKho')" class="fas fa-info-circle text-gray-400 absolute top-1/2 left-1/2 transform -translate-y-1/2 pl-1.5 cursor-pointer hover:text-open24-main"></i>
                            </td>
                            <td class="table-td text-right">{{ item.DonGia }}</td>
                            <td class="table-td text-right">{{ item.PTChietKhau }}</td>
                            <td class="table-td text-right">{{ item.PTThue }}</td>
                            <td class="table-td text-right">{{ item.ThanhToan }}</td>
                            <td class="table-td text-center" v-if="isModalHoaDon"><i @click="$emit('openModalChietKhauNhanVien', item)" class="fas fa-user text-open24-main cursor-pointer"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>  
            <div class="mt-4 pr-4 flex flex-col items-end">
                <div>
                    <div class="item-wrap">
                        <span class="item-label">Tổng số lượng:</span>
                        <span class="item-value">{{ tongSoLuong }}</span>
                    </div>
                    <div class="item-wrap">
                        <span class="item-label">Tổng tiền hàng:</span>
                        <span class="item-value">{{ data.TongTienHang }}</span>
                    </div>
                    <div class="item-wrap">
                        <span class="item-label">Tiền thuế:</span>
                        <span class="item-value">{{ data.TongTienThue }}</span>
                    </div>
                    <div class="item-wrap">
                        <span class="item-label">Giảm giá hóa đơn:</span>
                        <span class="item-value">{{ data.TongGiamGia }}</span>
                    </div>
                    <div class="item-wrap">
                        <span class="item-label">Khách cần trả:</span>
                        <span class="item-value">{{ data.PhaiThanhToan }}</span>
                    </div>
                    <div class="item-wrap">
                        <span class="item-label">Khách đã trả:</span>
                        <span class="item-value">{{ data.KhachDaTra }}</span>
                    </div>
                </div>
            </div>
        </template>
        <template #modal-footer>
            <button-cancel @click="$emit('closeModal')" />
            <button-save v-if="isModalHoaDon" buttonText="Cập nhật" class="button-distance" />
            <base-button class="bg-open24-main bg-open24-main-gradient hover:bg-none button-distance"><i class="fas fa-share mr-1"></i>Mở phiếu</base-button>
        </template>
    </base-modal>
</template>
<script>
import BaseModal from '../base/BaseModal.vue';
import ButtonSave from '../buttons/ButtonSave.vue';
import ButtonCancel from '../buttons/ButtonCancel.vue';
import BaseButton from '../base/BaseButton.vue';
import { formatDate } from '../../composables/useFormatDate.js';
export default {
    components: { BaseModal, ButtonSave, BaseButton, ButtonCancel },
    props: {
        modalTitle: String,
        isModalHoaDon: {
            type: Boolean,
            dafault: false,
        },
        data: Object,
    },
    emits: ['closeModal', 'openModalChiTietXuatKho', 'openModalChietKhauNhanVien'],
    setup(props) {
        const tongSoLuong = props.data.BH_HoaDon_ChiTiet.reduce((sum, item) => {
            return sum + item.SoLuong;
        }, 0);

        return {
            tongSoLuong,
            formatDate,
        }
    },
}
</script>

<style scoped>
    .item-wrap {
        @apply py-1;
    }
    .item-label {
        @apply inline-block w-32;
    }
    .item-value {
        @apply font-normal;
    }
</style>

