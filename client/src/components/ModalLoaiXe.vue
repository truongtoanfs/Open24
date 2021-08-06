<template>
    <BaseModal @closeModal="$emit('closeModal')" modalSize="md">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <BaseInputGroup label="Mã loại xe" placeholderText="Mã tự động" class="mb-1.5" />
            <BaseInputGroup label="Tên loại xe"/>
        </template>
        <template v-slot:modal-footer>
            <slot name="modal-footer"></slot>
        </template>
    </BaseModal>
</template>

<script>
    import BaseModal from './BaseModal.vue';
    import BaseInputGroup from './BaseInputGroup.vue';

    export default {
        components: {
            BaseModal,
            BaseInputGroup,
        },
        props: {
            modalTitle: String, 
        },
        emits: ["closeModal"],
    }
</script>