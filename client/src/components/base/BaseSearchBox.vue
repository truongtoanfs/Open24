<template>
    <div class="relative">
        <input type="text" :placeholder="contentSearch" class="w-full px-3 h-8 leading-6 border border-solid border-gray-400 focus:outline-none focus:border-blue-500 focus:shadow-md rounded">
        <base-button class="absolute inset-y-0 right-0 bg-open24-main bg-open24-main-gradient"><i class="fas fa-search"></i></base-button>
    </div>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
export default {
    props: {
        contentSearch: String,
    },
    components: {
        BaseButton,
    }
}
</script>