<template>
    <div class="flex">
        <label class="form-group__label">{{ label }}</label>
        <div @clickout="isOpenList = false" class="relative flex-cover">
            <div class="relative">
                <input type="text" class="input" @click="isOpenList = true, highlightText($event)" v-model="filterInput" :placeholder="placeholderText">
                <span v-if="requiredPlus" @click="$emit('openModalAddNew')" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-300 rounded-full">
                    <i class="fas fa-plus font-13"></i>
                </span>
            </div>
            <ul v-if="isOpenList" class="absolute z-10 mt-1 py-1 w-full max-h-56 overflow-auto rounded-md bg-white shadow-lg text-sm divide-y divide-gray-300">
                <li @click ="filterInput = item[dataBottomLeft], isOpenList = false" v-for="(item, index) in filterList" :key="index" class="relative py-1.5 px-2 cursor-default select-none font-normal hover:bg-gray-200">
                    <div class="flex items-center justify-between text-blue-400">
                        <span>{{ item[dataTopLeft] }}</span>
                        <span>{{ item[dataTopRight] }}</span>
                    </div>
                    <span>{{ item[dataBottomLeft] }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import filterData from '../../composables/useFilterData';
import highlightText from '../../composables/useHighlightText';

export default {
    props: {
        label: String,
        placeholderText: String,
        value: {
            type: String,
            default: '',
        },
        selectList: Array,
        dataTopLeft: {
            type: String,
            default: 'code',
        },
        dataTopRight: {
            type: String,
            default: 'phoneNumber',
        },
        dataBottomLeft: {
            type: String,
            default: 'name',
        },
        requiredPlus: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['openModalAddNew'],
    setup({ selectList, dataTopLeft, dataTopRight, dataBottomLeft, value }) {
        const isOpenList = ref(false);

        const filterInput = ref(value);
        const filterList = computed(() => {
            return filterData(filterInput.value, selectList, [dataTopLeft, dataTopRight, dataBottomLeft]);
        });

        return {
            isOpenList,
            filterInput,
            filterList,
            highlightText,
        }
    }
}
</script>