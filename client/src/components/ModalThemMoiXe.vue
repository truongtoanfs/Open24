<template>
    <BaseModal modalSize="lg" @closeModal="$emit('closeModal')">
        <template v-slot:modal-title>Thêm mới xe</template>
        <template v-slot:modal-content>
            <div class="xl:grid xl:grid-cols-2 gap-x-4">
                <BaseInputGroup class="mb-2.5 xl:order-1" label="Biển số" />
                <BaseInputGroupSelect class="mb-2.5 xl:order-3" label="Mẫu xe" placeholderText="Chọn mẫu xe" :selectList="mauXeList" />
                <BaseInputGroupSelect class="mb-2.5 xl:order-5" label="Hãng xe" placeholderText="Chọn hãng xe" :selectList="hangXeList" />
                <BaseInputGroupSelect class="mb-2.5 xl:order-7" label="Loại xe" placeholderText="Chọn loại xe" :selectList="loaiXeList" />
                <BaseInputGroup class="mb-2.5 xl:order-9" label="Năm SX" />
                <BaseInputGroup class="mb-2.5 xl:order-11" label="Chủ xe" />
                <BaseInputGroup class="mb-2.5 xl:order-2" label="Số khung" />
                <BaseInputGroup class="mb-2.5 xl:order-4" label="Số Máy" />
                <BaseInputGroup class="mb-2.5 xl:order-6" label="Màu sơn" />
                <BaseInputGroup class="mb-2.5 xl:order-8" label="Hộp số" />
                <BaseInputGroup class="mb-2.5 xl:order-10" label="Dung tích" />
                <BaseInputGroup class="mb-2.5 xl:order-12" label="SĐT" />
                <BaseTextareaGroup class="mb-2.5 xl:col-span-2 xl:order-last" label="Ghi chú" placeholderText="Nhập ghi chú.." />
            </div>
        </template>
        <template v-slot:modal-footer>
            <ButtonCancel @click="$emit('closeModal')" class="mr-2" />
            <ButtonSave />
        </template>
    </BaseModal>
</template>

<script>
    import BaseModal from './BaseModal.vue';
    import BaseInputGroup from './BaseInputGroup.vue';
    import BaseInputGroupSelect from './BaseInputGroupSelect.vue';
    import BaseTextareaGroup from './BaseTextareaGroup.vue';
    import ButtonCancel from './ButtonCancel.vue';
    import ButtonSave from './ButtonSave.vue';
    export default {
        props: {
            mauXeList: Array,
            hangXeList: Array,
            loaiXeList: Array,
        },
        emits: ['closeModal'],
        components: {
            BaseModal,
            BaseInputGroup,
            BaseInputGroupSelect,
            BaseTextareaGroup,
            ButtonCancel,
            ButtonSave
        },

    }
</script>

<style scoped>

</style>