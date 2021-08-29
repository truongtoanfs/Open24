<template>
    <BaseModal @closeModal="$emit('closeModal')" modalSize="md" class="z-40">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <BaseInputGroup label="Mã loại xe" placeholderText="Mã tự động" :value="maLoaiXe" class="mb-1.5" />
            <BaseInputGroup label="Tên loại xe" :value="tenLoaiXe" />
        </template>
        <template v-slot:modal-footer>
            <slot name="modal-footer"></slot>
        </template>
    </BaseModal>
</template>

<script>
    import BaseModal from '../BaseModal.vue';
    import BaseInputGroup from '../BaseInputGroup.vue';

    export default {
        components: {
            BaseModal,
            BaseInputGroup,
        },
        props: {
            modalTitle: String,
            maLoaiXe: {
                type: String,
                default: '',
            },
            tenLoaiXe: {
                type: String,
                default: '',
            },

        },
        emits: ["closeModal"],
    }
</script>