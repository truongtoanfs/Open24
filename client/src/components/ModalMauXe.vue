<template>
    <BaseModal @closeModal="$emit('closeModal')" modalSize="md">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <BaseInputGroup class="mb-1.5" label="Tên mẫu xe" />
            <BaseInputGroupSelect @openModalAddNew="$emit('openModalHangXe')" class="mb-1.5" label="Hãng xe" placeholderText="Chọn hãng xe" :selectList="hangxeList" />
            <BaseInputGroupSelect @openModalAddNew="$emit('openModalLoaiXe')" class="mb-1.5" label="Loại xe" placeholderText="Chọn loại xe" :selectList="loaixeList" />
            <BaseTextareaGroup label="Ghi chú" />
        </template>
        <template v-slot:modal-footer>
            <slot name="modal-footer"></slot>
        </template>
    </BaseModal>
</template>

<script>
    import BaseModal from './BaseModal.vue';
    import BaseInputGroup from './BaseInputGroup.vue';
    import BaseInputGroupSelect from './BaseInputGroupSelect.vue';
    import BaseTextareaGroup from './BaseTextareaGroup.vue';

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
        },
        emits: ["closeModal", "openModalHangXe", "openModalLoaiXe"],

        
    }
</script>