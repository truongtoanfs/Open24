<template>
    <div class="flex">
        <div class="flex flex-cover">
            <label class="form-group__label">{{ label }} <span v-if="required" class="text-red-500">(*)</span></label>
            <input type="text" :placeholder="placeholderText" class="flex-cover input">
        </div>
        <label class="relative flex items-center w-14 h-8 mx-2 my-0.5 bg-gray-300 rounded-2xl">
            <input type="checkbox" checked class="hidden toggle-button">
            <div class="button-slider w-7 h-7 rounded-full absolute top-0.5 left-0 bg-open24-main"></div>
            <span class="vnd-text relative z-10 w-7 ml-px text-center font-10 text-open24-accent">VNĐ</span>
            <span class="percent-text relative z-10 w-7 ml-px text-center font-13 text-open24-base">%</span>
        </label>
    </div>
</template>
<script>
export default {
    props: {
        label: String,
        placeholderText: String,
        required: Boolean,
    }
}
</script>

<style>
    .button-slider, .percent-text, .vnd-text {
        @apply transition-all duration-300 ease-in-out;
    }
    .toggle-button:checked + .button-slider {
        @apply left-7;
    }
    .toggle-button:checked ~ .percent-text {
        @apply text-open24-accent;
    }
    .toggle-button:checked ~ .vnd-text {
        @apply text-open24-base;
    }
    .font-10 {
        font-size: 10px;
    }
</style>
