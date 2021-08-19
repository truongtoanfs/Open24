<template>
    <div class="flex">
        <label class="form-group__label">{{ label }} <span v-if="required" class="text-red-500">(*)</span></label>
        <input type="text" :placeholder="placeholderText" class="flex-cover input">
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
