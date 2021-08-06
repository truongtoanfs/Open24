<template>
    <div class="absolute top-full left-0 z-50 w-full pt-1.5 md:w-80">
        <ul class="grid grid-cols-2 py-2 px-1 bg-gray-600 text-white text-sm rounded-sm">
            <li v-for="(column, index) in columnList" :key="index">
                <label class="flex items-center py-1.5 px-2 hover:bg-gray-500">
                    <input type="checkbox" class="h-4 w-4 mr-1.5" v-model="column.checked">
                    <span>{{ column.name }}</span>
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        columnList: Array,
    },
}
</script>