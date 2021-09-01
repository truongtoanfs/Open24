<template>
    <base-button class="bg-open24-main bg-open24-main-gradient hover:bg-none"><i class="fas fa-plus mr-0.5"></i> {{ text }}</base-button>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
export default {
    props: {
        text: {
            type: String,
            default: 'Thêm mới',
        }
    },
    components: {
        BaseButton,
    }
}
</script>