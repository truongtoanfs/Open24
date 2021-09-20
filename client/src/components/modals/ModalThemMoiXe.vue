<template>
    <base-modal modalSize="lg" requiredTwoCols @closeModal="$emit('closeModal')">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <base-input-group class="mb-2.5 xl:order-1" label="Biển số" :value="updateXeData ? updateXeData.BienSo : ''" :readonly="updateXeData?.BienSo ? true : false" />
            <base-input-group-select requiredPlus class="mb-2.5 xl:order-3" @openModalAddNew="$emit('openModalMauXe')" label="Mẫu xe" placeholderText="Chọn mẫu xe" :value="updateXeData ? updateXeData.TenMauXe : ''" :selectList="mauXeList" keywordFilter="TenMauXe" />
            <base-input-group-select requiredPlus class="mb-2.5 xl:order-5" @openModalAddNew="$emit('openModalHangXe')" label="Hãng xe" placeholderText="Chọn hãng xe" :value="updateXeData ? updateXeData.TenHangXe : ''" :selectList="hangXeList" keywordFilter="TenHangXe" />
            <base-input-group-select requiredPlus class="mb-2.5 xl:order-7" @openModalAddNew="$emit('openModalLoaiXe')" label="Loại xe" placeholderText="Chọn loại xe" :value="updateXeData ? updateXeData.TenLoaiXe : ''" :selectList="loaiXeList" keywordFilter="TenLoaiXe" />
            <base-input-group class="mb-2.5 xl:order-9" label="Năm SX" :value="updateXeData ? updateXeData.NamSanXuat : ''" />
            <base-input-group-select-info requiredPlus class="mb-2.5 xl:order-11" @openModalAddNew="$emit('openModalKhachHang')" label="Chủ xe" placeholderText="Khách hàng" :value="updateXeData ? updateXeData.TenLoaiXe : ''" :selectList="chuXeList" dataTopLeft="MaNguoiNop" dataTopRight="SoDienThoai" dataBottomLeft="NguoiNopTien" />
            <base-input-group class="mb-2.5 xl:order-2" label="Số khung" :value="updateXeData ? updateXeData.SoKhung : ''" />
            <base-input-group class="mb-2.5 xl:order-4" label="Số Máy" :value="updateXeData ? updateXeData.SoMay : ''" />
            <base-input-group class="mb-2.5 xl:order-6" label="Màu sơn" :value="updateXeData ? updateXeData.MauSon : ''" />
            <base-input-group class="mb-2.5 xl:order-8" label="Hộp số" :value="updateXeData ? updateXeData.HopSo : ''" />
            <base-input-group class="mb-2.5 xl:order-10" label="Dung tích" :value="updateXeData ? updateXeData.DungTich : ''" />
            <base-input-group class="mb-2.5 xl:order-12" label="SĐT" :value="updateXeData ? updateXeData.DienThoai : ''" />
            <base-textarea-group class="mb-2.5 xl:col-span-2 xl:order-last" label="Ghi chú" placeholderText="Nhập ghi chú.." :value="updateXeData ? updateXeData.GhiChu : ''" />
        </template>
        <template v-slot:modal-footer>
            <button-cancel @click="$emit('closeModal')" />
            <button-save class="button-distance" />
        </template>
    </base-modal>
</template>

<script>
import BaseModal from '../base/BaseModal.vue';
import BaseInputGroup from '../base/BaseInputGroup.vue';
import BaseInputGroupSelect from '../base/BaseInputGroupSelect.vue';
import BaseInputGroupSelectInfo from '../base/BaseInputGroupSelectInfo.vue';
import BaseTextareaGroup from '../base/BaseTextareaGroup.vue';
import ButtonCancel from '../buttons/ButtonCancel.vue';
import ButtonSave from '../buttons/ButtonSave.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
    props: {
        modalTitle: String,
        updateXeData: {
            type: Object,
            default: null,
        },
    },
    emits: ['closeModal', 'openModalMauXe', 'openModalHangXe', 'openModalLoaiXe', 'openModalKhachHang'],
    components: {
        BaseModal,
        BaseInputGroup,
        BaseInputGroupSelect,
        BaseInputGroupSelectInfo,
        BaseTextareaGroup,
        ButtonCancel,
        ButtonSave
    },
    setup() {
        const store = useStore();
        store.dispatch('getChuXeList');

        const hangXeList = computed(() => {
            return store.getters.hangXeList;
        })
        const loaiXeList = computed(() => {
            return store.getters.loaiXeList;
        })
        const mauXeList = computed(() => {
            return store.getters.mauXeList;
        })
        const chuXeList = computed(() => {
            return store.getters.chuXeList;
        })

        return {
            hangXeList,
            loaiXeList,
            mauXeList,
            chuXeList,
        }
    }
}
</script>
