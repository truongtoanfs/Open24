<template>
    <div class="flex">
        <label class="w-28 text-gray-600">{{ label }}</label>
        <BaseListBox class="flex-cover" :placeholderText="placeholderText" :selectList="selectList" />
    </div>
</template>
<script>
import BaseListBox from './BaseListBox.vue';
export default {
    props: {
        label: String,
        placeholderText: String,
        selectList: Array,
    },
    components: {
        BaseListBox,
    },
}
</script>
