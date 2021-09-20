<template>
    <base-modal @closeModal="$emit('closeModal')" modalSize="lg">
        <template #modal-title>Chi tiết xuất kho</template>
        <template #modal-content>
            <div class="text-red-500"><i class="fas fa-info-circle text-gray-400"></i> Thay dầu xe máy</div>
            <p class="pt-2 pb-4">(*): Là định lượng bổ xung khi xuất kho</p>
            <div class="overflow-auto">
                <table class="w-full border-b border-gray-300">
                    <thead>
                        <tr>
                            <th colspan="4" class="table-th border-b text-center">Hàng hóa định lượng</th>
                            <th colspan="5" class="table-th border-b text-center">Đã xuất thực tế</th>
                        </tr>
                        <tr>
                            <th class="table-th">Mã hàng</th>
                            <th class="table-th">Tên hàng</th>
                            <th class="table-th">Số lượng</th>
                            <th class="table-th">Giá trị</th>
                            <th class="table-th">Mã phiếu</th>
                            <th class="table-th">Ngày xuất</th>
                            <th class="table-th">Số lượng</th>
                            <th class="table-th">Giá trị</th>
                            <th class="table-th">Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-tr-td" v-for="(item, index) in data" :key="index">
                            <td class="table-td">{{ item.MaHangHoa }}</td>
                            <td class="table-td">{{ item.TenHangHoa }}</td>
                            <td class="table-td">{{ item.SoLuongDinhLuong_BanDau }}</td>
                            <td class="table-td">{{ item.GiaTriDinhLuong_BanDau }}</td>
                            <td class="table-td">{{ item.MaHoaDon }}</td>
                            <td class="table-td">{{ item.NgayLapHoaDon }}</td>
                            <td class="table-td">{{ item.SoLuong }}</td>
                            <td class="table-td">{{ item.GiaVon }}</td>
                            <td class="table-td">{{ item.GhiChu }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
        <template #modal-footer>
            <button-cancel @click="$emit('closeModal')" />
        </template>
    </base-modal>
</template>

<script>
import BaseModal from '../base/BaseModal.vue';
import ButtonCancel from '../buttons/ButtonCancel.vue';
import { ref } from 'vue';

export default {
    components: {
        BaseModal,
        ButtonCancel,
    },
    props: {
        data: Array,
    },
    emits: ['closeModal'],
}
</script>