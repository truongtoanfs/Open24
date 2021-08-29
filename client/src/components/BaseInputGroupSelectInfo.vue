<template>
    <div class="flex">
        <label class="form-group__label">{{ label }}</label>
        <div v-click-outside="closeDropdown" class="relative flex-cover">
            <div class="relative">
                <input type="text" class="input" @click="isOpenList = true, highlightText($event)" v-model="filterInput" :placeholder="placeholderText">
                <span v-if="requiredPlus" @click="$emit('openModalAddNew')" class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-300 rounded-full">
                    <i class="fas fa-plus font-13"></i>
                </span>
            </div>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ul v-if="isOpenList" class="absolute z-10 mt-1 py-1 w-full max-h-56 overflow-auto rounded-md bg-white shadow-lg text-sm divide-y divide-gray-300">
                    <li @click ="filterInput = item.name, closeDropdown()" v-for="(item, index) in filterList" :key="index" class="relative py-1.5 px-2 cursor-default select-none font-normal hover:bg-gray-300">
                        <div class="flex items-center justify-between text-blue-400">
                            <span>{{ item.code }}</span>
                            <span>{{ item.phoneNumber }}</span>
                        </div>
                        <span>{{ item.name }}</span>
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import removeAccents from '../composables/useRemoveAccents';


export default {
    props: {
        label: String,
        placeholderText: String,
        value: {
            type: String,
            default: '',
        },
        selectList: Array,
        requiredPlus: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['openModalAddNew'],
    setup({ selectList, value }) {
        const isOpenList = ref(false);
        const filterInput = ref(value);

        function closeDropdown() {
            isOpenList.value = false;
        }

        const filterList = ref(selectList);
        watch(filterInput, (newValue, oldValue) => {
            if(newValue.length === 0) {
                filterList.value = selectList;
            } else {
                filterList.value = selectList.filter(item => {
                    const itemNameNoAccents = removeAccents(item.name);
                    const itemCode = item.code;
                    const itemPhoneNumber = item.phoneNumber;
                    const inputNoAccents = removeAccents(newValue);
                    return itemNameNoAccents.toUpperCase().includes(inputNoAccents.toUpperCase())
                    || itemCode.toUpperCase().includes(inputNoAccents.toUpperCase())
                    || itemPhoneNumber.includes(inputNoAccents);
                })
            }
        })

        function highlightText(event) {
            event.currentTarget.select();
            filterList.value = selectList;
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