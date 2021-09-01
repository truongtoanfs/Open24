<template>
    <div class="flex">
        <label class="form-group__label">{{ label }}</label>
        <div v-click-outside="closeDropdown" class="relative flex-cover">
            <div class="relative">
                <input ref="input" @click="isOpenList = true, highlightText($event)" type="text" class="input" :placeholder="placeholderText" v-model="filterInput">
                <span v-if="requiredPlus" @click="$emit('openModalAddNew')" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-300 rounded-full">
                    <i class="fas fa-plus font-13"></i>
                </span>
            </div>

            <ul v-if="isOpenList" class="absolute z-10 mt-1 py-1 w-full max-h-56 overflow-auto rounded-md bg-white shadow-lg text-sm font-normal divide-y divide-gray-300">
                <li @click ="filterInput = item[keywordFilter], closeDropdown(), $emit('selected', item[keywordFilter])" v-for="(item, index) in filterList" :key="index" class="relative py-1.5 px-2 cursor-default select-none">
                    <span>
                        {{ item[keywordFilter] }}
                    </span>
                    <span v-if="filterInput === item[keywordFilter]" class="absolute inset-y-0 right-0 flex items-center pr-4">
                        <i class="fas fa-check text-blue-600" />
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { onMounted, ref, watch } from 'vue';
import removeAccents from '/Open24/client/src/composables/useRemoveAccents';


export default {
    props: {
        label: String,
        placeholderText: String,
        value: {
            type: String,
            default: '',
        },
        selectList: Array,
        keywordFilter: {
            type: String,
            default: 'name'
        },
        requiredPlus: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['openModalAddNew', 'selected'],
    setup(props) {
        const isOpenList = ref(false);
        const filterInput = ref(props.value);
        function closeDropdown() {
            isOpenList.value = false;
        }

        const filterList = ref([]);
        watch(filterInput, (newValue, oldValue) => {
            if(newValue.length === 0) {
                filterList.value = props.selectList;
            } else {
                filterList.value = props.selectList.filter(item => {
                    const itemNameNoAccents = removeAccents(item[props.keywordFilter]);
                    const inputNoAccents = removeAccents(newValue);
                    return itemNameNoAccents.toUpperCase().includes(inputNoAccents.toUpperCase());
                })
            }
        }, {immediate: true})

        function highlightText(event) {
            event.currentTarget.select();
            filterList.value = props.selectList;
        }
        
        return {
            isOpenList,
            filterInput,
            closeDropdown,
            filterList,
            highlightText,
        }
    }
}
</script>
