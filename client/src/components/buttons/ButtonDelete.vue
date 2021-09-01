<template>
    <div>
        <base-button @click="isOpenConfirmModal = true" class="bg-red-600"><i class="far fa-trash-alt mr-1"></i>Xóa</base-button>
        <base-modal modalSize="sm" v-if="isOpenConfirmModal" @closeModal="isOpenConfirmModal = false">
            <template #modal-title>Xác nhận xóa</template>
            <template #modal-content>
                Bạn có chắc chắn muốn
                <span class="bg-yellow-300 bg-opacity-60">
                    xóa <slot></slot>
                </span>
                không ?
            </template>
            <template #modal-footer>
                <button-cancel @click="isOpenConfirmModal = false" />
                <button-agree class="button-distance" />
            </template>
        </base-modal>
    </div>
</template>

<script>
    import BaseButton from '../base/BaseButton.vue';
    import ButtonCancel from '../buttons/ButtonCancel.vue';
    import ButtonAgree from '../buttons/ButtonAgree.vue';
    import BaseModal from '../base/BaseModal.vue';
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