<template>
    <BaseButton @click="$emit('closeModal')" class="bg-red-600"><i class="fas fa-ban mr-1"></i>Hủy bỏ</BaseButton>
</template>

<script>
    import BaseButton from './BaseButton.vue';
    export default {
        components: {
            BaseButton,
        },
        emits: ['closeModal'],
    }
</script>