<template>
    <base-modal @closeModal="$emit('closeModal')" modalSize="md" class="z-20">
        <template v-slot:modal-title>{{ modalTitle }}</template>
        <template v-slot:modal-content>
            <base-input-group label="Tên Trạng thái" :required="true" />
        </template>
        <template v-slot:modal-footer>
            <button-cancel @click="$emit('closeModal')" />
            <button-save class="button-distance" />
        </template>
    </base-modal>
</template>

<script>
import BaseModal from '../base/BaseModal.vue';
import BaseInputGroup from '../base/BaseInputGroup.vue';
import ButtonCancel from '../buttons/ButtonCancel.vue';
import ButtonSave from '../buttons/ButtonSave.vue';

export default {
    components: {
        BaseModal,
        BaseInputGroup,
        ButtonCancel,
        ButtonSave,
    },
    props: {
        modalTitle: String, 
    },
    emits: ['closeModal'],
}
</script>