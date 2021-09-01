<template>
    <base-modal modalSize="lg" @closeModal="$emit('closeModal')">
        <template v-slot:modal-title>Nhập {{ sectionName }} từ file dữ liệu</template>
        <template v-slot:modal-content>
            <div class="font-normal text-black text-center">
                <p>Nhập {{ sectionName }} từ file Excel - <a href="#" class="text-blue-400 underline">Hướng dẫn</a></p>
                <p>Tải về mẫu <a href="#" class="text-blue-400 underline" :download="`FileImport_${sectionName}_2003`">Excel 2003</a> hoặc <a href="#" class="text-blue-400 underline" :download="`FileImport_${sectionName}`">bản cao hơn</a></p>
                
                <div class="mt-6 mb-5">
                    <label class="bg-open24-main bg-open24-main-gradient text-white p-1.5 rounded cursor-pointer">
                        Chọn file dữ liệu
                        <input type="file" class="hidden">
                    </label>
                </div>
                <div class="bg-yellow-100 bg-opacity-70 py-3 px-2 font-13 text-left lg:text-center">
                    <h4 class="font-medium text-red-500"><i class="fas fa-exclamation-triangle"></i> Lưu ý</h4>
                    <p>Bạn vui lòng nhập đúng định dạng hàng cột theo file Excel mẫu.</p>
                    <p>Hệ thống cho phép nhập tối đa 6000 khách hàng mỗi lần từ file Excel 2003 hoặc bản cao hơn.</p>
                    <p>Click vào checkbook "đồng ý..." nếu bạn muốn tiếp tục import dữ liệu bằng cách bỏ qua dữ liệu sai.</p>
                </div>
            </div>
        </template>
    </base-modal>
</template>

<script>
    import BaseModal from '../base/BaseModal.vue';
    import BaseButton from '../base/BaseButton.vue';
    
    export default {
        props: {
            sectionName: String,
        },
        emits: ['closeModal'],
        components: {
            BaseModal,
            BaseButton,
        },

    }
</script>

<style scoped>

</style>