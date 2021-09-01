<template>
    <div class="flex">
        <label class="form-group__label">{{ label }}</label>
        <textarea rows="2" :placeholder="placeholderText" :value="value" class="flex-cover input h-auto"></textarea>
    </div>
</template>
<script>
export default {
    props: {
        label: String,
        placeholderText: String,
        value: {
            type: String,
            default: '',
        }
    }
}
</script>
