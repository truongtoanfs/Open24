<template>
    <base-button class="bg-open24-main bg-open24-main-gradient hover:bg-none"><i class="fas fa-save mr-1"></i>{{  buttonText }}</base-button>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
export default {
    props: {
        buttonText: {
            type: String,
            default: 'Lưu lại',
        },
    },
    components: {
        BaseButton,
    }
}
</script>