<template>
    <BaseModal @closeModal="$emit('closeModal')" modalSize="md" class="z-40">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <BaseInputGroup label="Mã hãng xe" placeholderText="Mã tự động" :value="maHangXe" class="mb-1.5" />
            <BaseInputGroup label="Tên hãng xe" :value="tenHangXe" />
            <div class="flex justify-center mt-2">
                <img class="border border-dashed border-gray-300 h-28 w-32 p-1.5 object-contain" :src="logoURL ? logoURL : '/src/assets/images/logo-open24-blue.png'" alt="logo hãng xe">
            </div>
            <div class="flex justify-center mt-2">
                <input type="file" id="choose-logo" class="hidden" @change="updateLogo($event)">
                <label for="choose-logo" class="cursor-pointer block w-60 text-center py-1.5 rounded bg-open24-main bg-open24-main-gradient text-white">Chọn logo</label>
            </div>
        </template>
        <template v-slot:modal-footer>
            <slot name="modal-footer"></slot>
        </template>
    </BaseModal>
</template>

<script>
    import BaseModal from '../BaseModal.vue';
    import BaseInputGroup from '../BaseInputGroup.vue';
    import usePreviewImage from '/Open24/client/src/composables/usePreviewImage';
    import { ref } from 'vue';

    export default {
        components: {
            BaseModal,
            BaseInputGroup,
        },
        props: {
            modalTitle: String, 
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
        setup({ imageUrl }) {
            console.log('imageUrl', imageUrl);
            const logoURL = ref(imageUrl);

            function updateLogo(event) {
                logoURL.value = usePreviewImage(event)[0];
            }

            return {
                logoURL,
                updateLogo,
            }
        },
        emits: ["closeModal"],
    }
</script>