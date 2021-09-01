<template>
    <base-modal @closeModal="$emit('closeModal')" modalSize="md" class="z-40">
        <template #modal-title>{{ modalTitle }}</template>
        <template #modal-content>
            <base-input-group label="Mã hãng xe" placeholderText="Mã tự động" :value="maHangXe" class="mb-1.5" />
            <base-input-group label="Tên hãng xe" :value="tenHangXe" />
            <div class="flex justify-center mt-2">
                <img class="border border-dashed border-gray-300 h-28 w-32 p-1.5 object-contain" :src="logoURL ? logoURL : '/src/assets/images/logo-open24-blue.png'" alt="logo hãng xe">
            </div>
            <div class="flex justify-center mt-2">
                <input type="file" id="choose-logo" class="hidden" @change="updateLogo($event)">
                <label for="choose-logo" class="cursor-pointer block w-60 text-center py-1.5 rounded bg-open24-main bg-open24-main-gradient text-open24-accent">Chọn logo</label>
            </div>
        </template>
        <template #modal-footer>
            <button-cancel @click="$emit('closeModal')" />
            <button-delete v-if="isUpdateModal" class="button-distance">hãng xe {{ tenHangXe }}</button-delete>
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
import usePreviewImage from '/Open24/client/src/composables/usePreviewImage';
import { ref } from 'vue';

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
        maHangXe: {
            type: String,
            default: ''
        },
        tenHangXe: {
            type: String,
            default: ''
        },
        imageUrl: {
            type: String,
            default: ''
        },
    },
    emits: ["closeModal"],
    setup(props) {
        const logoURL = ref(props.imageUrl);
        function updateLogo(event) {
            logoURL.value = usePreviewImage(event)[0];
        }

        return {
            logoURL,
            updateLogo,
        }
    },
}
</script>