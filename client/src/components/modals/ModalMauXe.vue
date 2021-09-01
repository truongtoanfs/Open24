<template>
    <base-modal @closeModal="$emit('closeModal')" modalSize="md" class="z-30">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <base-input-group :value="tenMauXe" class="mb-1.5" label="Tên mẫu xe" />
            <base-input-group-select requiredPlus @openModalAddNew="$emit('openModalHangXe')" class="mb-1.5" label="Hãng xe" placeholderText="Chọn hãng xe" :value="tenHangXe" :selectList="hangXeList" />
            <base-input-group-select requiredPlus @openModalAddNew="$emit('openModalLoaiXe')" class="mb-1.5" label="Loại xe" placeholderText="Chọn loại xe" :value="tenLoaiXe" :selectList="loaiXeList" />
            <base-textarea-group label="Ghi chú" :value="ghiChu" />
        </template>
        <template v-slot:modal-footer>
            <button-cancel @click="$emit('closeModal')" />
            <button-delete v-if="isUpdateModal" class="button-distance">mẫu xe {{ tenMauXe }}</button-delete>
            <button-save class="button-distance" />
        </template>
    </base-modal>
</template>

<script>
import BaseModal from '../base/BaseModal.vue';
import BaseInputGroup from '../base/BaseInputGroup.vue';
import BaseInputGroupSelect from '../base/BaseInputGroupSelect.vue';
import BaseTextareaGroup from '../base/BaseTextareaGroup.vue';
import ButtonCancel from '../buttons/ButtonCancel.vue';
import ButtonDelete from '../buttons/ButtonDelete.vue';
import ButtonSave from '../buttons/ButtonSave.vue';

export default {
    components: {
        BaseModal,
        BaseInputGroup,
        BaseInputGroupSelect,
        BaseTextareaGroup,
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
        hangXeList: Array,
        loaiXeList: Array,
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