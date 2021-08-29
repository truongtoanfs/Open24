<template>
    <BaseModal modalSize="lg" requiredTwoCols @closeModal="$emit('closeModal')">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <BaseInputGroup class="mb-2.5 xl:order-1" label="Biển số" :value="updateXeData ? updateXeData.BienSo : ''" :readonly="updateXeData?.BienSo ? true : false" />
            <BaseInputGroupSelect class="mb-2.5 xl:order-3" @openModalAddNew="$emit('openModalMauXe')" label="Mẫu xe" placeholderText="Chọn mẫu xe" :value="updateXeData ? updateXeData.TenMauXe : ''" :selectList="mauxeList" keywordFilter="TenMauXe" />
            <BaseInputGroupSelect class="mb-2.5 xl:order-5" @openModalAddNew="$emit('openModalHangXe')" label="Hãng xe" placeholderText="Chọn hãng xe" :value="updateXeData ? updateXeData.TenHangXe : ''" :selectList="hangxeList" keywordFilter="TenHangXe" />
            <BaseInputGroupSelect class="mb-2.5 xl:order-7" @openModalAddNew="$emit('openModalLoaiXe')" label="Loại xe" placeholderText="Chọn loại xe" :value="updateXeData ? updateXeData.TenLoaiXe : ''" :selectList="loaixeList" keywordFilter="TenLoaiXe" />
            <BaseInputGroup class="mb-2.5 xl:order-9" label="Năm SX" :value="updateXeData ? updateXeData.NamSanXuat : ''" />
            <BaseInputGroupSelectInfo :requiredPlus="true" class="mb-2.5 xl:order-11" @openModalAddNew="$emit('openModalKhachHang')" label="Chủ xe" placeholderText="Khách hàng" :value="updateXeData ? updateXeData.TenLoaiXe : ''" :selectList="chuxeList" />
            <BaseInputGroup class="mb-2.5 xl:order-2" label="Số khung" :value="updateXeData ? updateXeData.SoKhung : ''" />
            <BaseInputGroup class="mb-2.5 xl:order-4" label="Số Máy" :value="updateXeData ? updateXeData.SoMay : ''" />
            <BaseInputGroup class="mb-2.5 xl:order-6" label="Màu sơn" :value="updateXeData ? updateXeData.MauSon : ''" />
            <BaseInputGroup class="mb-2.5 xl:order-8" label="Hộp số" :value="updateXeData ? updateXeData.HopSo : ''" />
            <BaseInputGroup class="mb-2.5 xl:order-10" label="Dung tích" :value="updateXeData ? updateXeData.DungTich : ''" />
            <BaseInputGroup class="mb-2.5 xl:order-12" label="SĐT" :value="updateXeData ? updateXeData.DienThoai : ''" />
            <BaseTextareaGroup class="mb-2.5 xl:col-span-2 xl:order-last" label="Ghi chú" placeholderText="Nhập ghi chú.." :value="updateXeData ? updateXeData.GhiChu : ''" />
        </template>
        <template v-slot:modal-footer>
            <slot name="modal-footer"></slot>
        </template>
    </BaseModal>
</template>

<script>
    import BaseModal from '../BaseModal.vue';
    import BaseInputGroup from '../BaseInputGroup.vue';
    import BaseInputGroupSelect from '../BaseInputGroupSelect.vue';
    import BaseInputGroupSelectInfo from '../BaseInputGroupSelectInfo.vue';
    import BaseTextareaGroup from '../BaseTextareaGroup.vue';
    import ButtonCancel from '../ButtonCancel.vue';
    import ButtonSave from '../ButtonSave.vue';
    export default {
        props: {
            modalTitle: String,
            mauxeList: Array,
            hangxeList: Array,
            loaixeList: Array,
            chuxeList: Array,
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
    }
</script>

<style scoped>

</style>