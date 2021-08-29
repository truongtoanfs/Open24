<template>
    <BaseModal @closeModal="$emit('closeModal')" modalSize="md" class="z-30">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <BaseInputGroup :value="tenMauXe" class="mb-1.5" label="Tên mẫu xe" />
            <BaseInputGroupSelect @openModalAddNew="$emit('openModalHangXe')" class="mb-1.5" label="Hãng xe" placeholderText="Chọn hãng xe" :value="tenHangXe" :selectList="hangxeList" keywordFilter="TenHangXe" />
            <BaseInputGroupSelect @openModalAddNew="$emit('openModalLoaiXe')" class="mb-1.5" label="Loại xe" placeholderText="Chọn loại xe" :value="tenLoaiXe" :selectList="loaixeList" keywordFilter="TenLoaiXe" />
            <BaseTextareaGroup label="Ghi chú" :value="ghiChu" />
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
    import BaseTextareaGroup from '../BaseTextareaGroup.vue';

    export default {
        components: {
            BaseModal,
            BaseInputGroup,
            BaseInputGroupSelect,
            BaseTextareaGroup,
        },
        props: {
            modalTitle: String,
            title: String,
            hangxeList: Array,
            loaixeList: Array,
            tenMauXe: {
                type: String,
                default: '',
            },
            tenHangXe: {
                type: String,
                default: '',
            },
            tenLoaiXe: {
                type: String,
                default: '',
            },
            ghiChu: {
                type: String,
                default: '',
            },
        },
        emits: ["closeModal", "openModalHangXe", "openModalLoaiXe"],

        
    }
</script>