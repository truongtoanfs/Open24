<template>
    <div class="flex">
        <label class="form-group__label">{{ label }}</label>
        <textarea rows="2" :placeholder="placeholderText" class="flex-cover input h-auto"></textarea>
    </div>
</template>
<script>
export default {
    props: {
        label: String,
        placeholderText: String,
    }
}
</script>
