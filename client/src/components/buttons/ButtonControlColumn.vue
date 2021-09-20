<template>
    <div @clickout="isOpenDropdownColumn = false" class="md:relative">
        <base-button @click="isOpenDropdownColumn = !isOpenDropdownColumn" class="bg-open24-main bg-open24-main-gradient hover:bg-none"><i class="fas fa-angle-double-down px-1.5"></i></base-button>
        <div v-if="isOpenDropdownColumn" class="absolute top-full left-0 z-50 w-full pt-1.5 md:w-80">
            <ul class="grid grid-cols-2 py-2 px-1 bg-gray-600 text-white text-sm rounded-sm">
                <li v-for="(column, index) in columnList" :key="index">
                    <label class="flex items-center py-1.5 px-2 hover:bg-gray-500">
                        <input type="checkbox" class="h-4 w-4 mr-1.5" v-model="column.colShow">
                        <span>{{ column.colText }}</span>
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';
import { ref } from 'vue';
export default {
    props: {
        columnList: Array,
    },
    components: {
        BaseButton,
    },
    setup() {
        const isOpenDropdownColumn = ref(false);

        return {
            isOpenDropdownColumn,
        }
    }
}
    
</script>