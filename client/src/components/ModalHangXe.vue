<template>
    <BaseModal @closeModal="$emit('closeModal')" modalSize="md">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <BaseInputGroup label="Mã hãng xe" placeholderText="Mã tự động" class="mb-1.5" />
            <BaseInputGroup label="Tên hãng xe"/>
            <div class="flex justify-center mt-2">
                <img class="border border-dashed border-gray-300 py-5 px-2 max-h-28" :src="logoURL ? logoURL : '/src/assets/images/logo-open24-blue.png'" alt="logo hãng xe">
            </div>
            <div class="flex justify-center mt-2">
                <input type="file" id="choose-logo" class="hidden" @change="previewLogo($event)">
                <label for="choose-logo" class="cursor-pointer block w-60 text-center py-1.5 rounded bg-primary text-white">Chọn logo</label>
            </div>
        </template>
        <template v-slot:modal-footer>
            <slot name="modal-footer"></slot>
        </template>
    </BaseModal>
</template>

<script>
    import BaseModal from './BaseModal.vue';
    import BaseInputGroup from './BaseInputGroup.vue';
    import { ref } from 'vue';

    export default {
        components: {
            BaseModal,
            BaseInputGroup,
        },
        props: {
            modalTitle: String, 
        },
        setup() {
            const logoURL = ref('');

            function previewLogo(event) {
                const file = event.target.files[0];
                logoURL.value = URL.createObjectURL(file);
                console.log(logoURL);
            }

            return {
                logoURL,
                previewLogo,
            }
        },
        emits: ["closeModal"],
    }
</script>