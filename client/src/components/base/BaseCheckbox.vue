<template>
    <div>
        <label class="font-medium leading-6 flex items-center">
            <input type="checkbox" :checked="value" class="h-4 w-4 mr-1.5">
            <span>{{ label }}</span>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        value: {
            type: Boolean,
            default: false,
        }
    }
}
</script>