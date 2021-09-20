<template>
    <div @clickout="isOpenList = false" class="relative" :class="inputWidth">
        <div class="relative">
            <input ref="input" @click="isOpenList = true, highlightText($event)" type="text" class="input" :placeholder="placeholderText" v-model="filterInput">
            <span v-if="requiredPlus" @click="$emit('openModalAddNew')" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-300 rounded-full">
                <i class="fas fa-plus font-13"></i>
            </span>
        </div>

        <ul v-if="isOpenList" class="absolute z-10 mt-1 py-1 w-full max-h-56 overflow-auto rounded-md bg-white shadow-lg text-sm font-normal divide-y divide-gray-300">
            <li @click ="filterInput = item, isOpenList = false" v-for="(item, index) in filterList" :key="index" class="relative py-1.5 px-2 cursor-default select-none">
                <span>
                    {{ item }}
                </span>
                <span v-if="filterInput === item" class="absolute inset-y-0 right-0 flex items-center pr-4">
                    <i class="fas fa-check text-blue-600" />
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import removeAccents from '../../composables/useRemoveAccents';
import highlightText from '../../composables/useHighlightText';
import filterData from '../../composables/useFilterData';

export default {
    props: {
        placeholderText: String,
        selectList: Array,
        inputWidth: {
            type: String,
            default: 'flex-cover',
        },
        requiredPlus: {
            type: Boolean,
            default: false,
        },
        
    },
    emits: ['openModalAddNew'],
    setup(props) {
        const isOpenList = ref(false);
        let delfaultValue = '';
        if (!props.placeholderText) {
            delfaultValue = props.selectList[0];
        }
        const filterInput = ref(delfaultValue);
        const filterList = computed(() => filterData(filterInput.value, props.selectList));
        
        return {
            isOpenList,
            filterInput,
            filterList,
            highlightText,
        }
    }
}
</script>
