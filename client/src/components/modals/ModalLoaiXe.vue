<template>
    <base-modal @closeModal="$emit('closeModal')" modalSize="md" class="z-40">
        <template #modal-title>{{ modalTitle }}</template>
        <template #modal-content>
            <base-input-group label="Mã loại xe" placeholderText="Mã tự động" :value="maLoaiXe" class="mb-1.5" />
            <base-input-group label="Tên loại xe" :value="tenLoaiXe" />
        </template>
        <template #modal-footer>
            <button-cancel @click="$emit('closeModal')" />
            <button-delete v-if="isUpdateModal" class="button-distance">loại xe {{ tenLoaiXe }}</button-delete>
            <button-save class="button-distance" />
        </template>
    </base-modal>
</template>

<script>
import BaseModal from '../base/BaseModal.vue';
import BaseInputGroup from '../base/BaseInputGroup.vue';
import ButtonCancel from '../buttons/ButtonCancel.vue';
import ButtonDelete from '../buttons/ButtonDelete.vue';
import ButtonSave from '../buttons/ButtonSave.vue';

export default {
    components: {
        BaseModal,
        BaseInputGroup,
        ButtonCancel,
        ButtonDelete,
        ButtonSave,
    },
    props: {
        modalTitle: String,
        isUpdateModal: {
            type: Boolean,
            default: false,
        },
        maLoaiXe: {
            type: String,
            default: '',
        },
        tenLoaiXe: {
            type: String,
            default: '',
        },

    },
    emits: ['closeModal'],
}
</script>