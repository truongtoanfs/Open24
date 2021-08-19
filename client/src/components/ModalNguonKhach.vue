<template>
    <BaseModal @closeModal="$emit('closeModal')" modalSize="md" class="z-20">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <BaseInputGroup label="Tên nguồn khách" :required="true" />
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