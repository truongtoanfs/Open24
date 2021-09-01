<template>
    <div class="flex">
        <label class="form-group__label">{{ label }} <span v-if="required" class="text-red-500">(*)</span></label>
        <input type="text" :placeholder="placeholderText" :value="value" class="flex-cover input" :class="readonly ? 'bg-readonly' : ''" :readonly="readonly">
    </div>
</template>
<script>
export default {
    props: {
        label: String,
        placeholderText: String,
        required: Boolean,
        readonly: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Number],
            default: '',
        },
    },
}
</script>
