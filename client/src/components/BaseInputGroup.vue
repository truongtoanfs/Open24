<template>
    <div class="flex">
        <label class="w-28 text-gray-600">{{ label }}</label>
        <input type="text" :placeholder="placeholderText" class="flex-cover input">
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
