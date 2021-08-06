<template>
    <div>
        <BaseButton @click="isOpenConfirmModal = true" class="bg-red-500 hover:bg-opacity-90"><i class="far fa-trash-alt mr-1"></i>Xóa</BaseButton>
        <BaseModal @closeModal="isOpenConfirmModal = false" modalSize="sm" v-if="isOpenConfirmModal">
            <template v-slot:modal-title>Xác nhận xóa</template>
            <template v-slot:modal-content>Bạn có chắc chắn muốn xóa không ?</template>
            <template v-slot:modal-footer>
                <ButtonCancel @click="isOpenConfirmModal = false" class="mr-2" />
                <ButtonAgree />
            </template>
        </BaseModal>
    </div>
</template>

<script>
    import BaseButton from './BaseButton.vue';
    import ButtonCancel from './ButtonCancel.vue';
    import ButtonAgree from './ButtonAgree.vue';
    import BaseModal from './BaseModal.vue';
    import { ref } from 'vue';
    export default {
        components: {
            BaseButton,
            ButtonCancel,
            ButtonAgree,
            BaseModal,
        },
        setup() {
            const isOpenConfirmModal = ref(false);

            return {
                isOpenConfirmModal,
            }
        }
    }
</script>