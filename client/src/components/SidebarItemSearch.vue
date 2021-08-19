<template>
    <div>
        <div @click="isCollapseItem = !isCollapseItem"  class="flex items-center justify-between text-sm  bg-gray-400 bg-opacity-60">
            <div class="flex items-center">
                <span class="text-base pl-3">
                    <slot name="header-icon"></slot>
                </span>
                <h4 class="font-semibold px-2 select-none">{{ headerText }}</h4>
            </div>
            <span @click.stop="$emit('openModal')" class="py-1.5 px-3 cursor-pointer text-open24-main">
                <i class="fas fa-plus"></i>
            </span>
        </div>
        <Accordition>
            <div v-if="isCollapseItem" class="mx-3">
                <div class="relative border-b border-solid border-gray-300 mt-0.5">
                    <span class="absolute inset-y-0 left-0 flex items-center text-sm"><i class="fas fa-search text-gray-700"></i></span>
                    <input v-model="filterInput" :placeholder="searchLabel" type="text" class="w-full h-8 pl-6 border-0 focus:outline-none placeholder-gray-500">
                </div>
                <button class="font-medium px-3 py-1 rounded border-b border-solid border-gray-200 hover:bg-gray-200">TẤT CẢ</button>
                <ul class="max-h-28 overflow-y-auto">
                    <li v-for="car in carList" :key="car.id" class="flex items-center justify-between group cursor-default hover:bg-gray-200 pl-3 rounded-sm">
                        <span class="font-medium leading-6">{{ car.name }}</span>
                        <span @click="$emit('openModalUpdate')" class="invisible group-hover:visible cursor-pointer text-blue-500 hover:text-blue-700 text-base px-2 py-0.5"><i class="far fa-edit"></i></span>
                    </li>
                </ul>
            </div>
        </Accordition>
    </div>
    <!--
        Tìm kiếm hãng xe:
            + Tìm kiếm theo nhiều hãng, lọc các trường còn lại
            + có thể highlight những hãng xe dã chọn được không
     -->    
</template>

<script>
import { ref } from '@vue/reactivity'
import { onBeforeUpdate, watch } from '@vue/runtime-core';
import Accordition from './Accordition.vue';
import removeAccents from '../composables/useRemoveAccents';


    export default {
        props: {
            headerText: String,
            searchLabel: String,
            filterData: Array,
            isCollapseAll: Boolean,
        },
        components: {
            Accordition,
        },
        emits: ['openModalUpdate', 'openModal'],
        setup({ filterData, isCollapseAll }) {
            let isCollapseItem = ref(isCollapseAll);
            const filterInput = ref('');
            const carList = ref([]);
            
            watch(filterInput, (newValue, oldValue) => {
                if(newValue.length === 0) {
                    carList.value = filterData;
                } else {
                    carList.value = filterData.filter(car => {
                        const carNameNoAccents = removeAccents(car.name);
                        const inputNoAccents = removeAccents(newValue);
                        return carNameNoAccents.toUpperCase().includes(inputNoAccents.toUpperCase());
                    })
                }
            }, {immediate: true})

            return {
                isCollapseItem,
                filterInput,
                carList,
            }
        },
        watch: {
            isCollapseAll(val, oldVal) {
                this.isCollapseItem = val;
            },
        },
    }
</script>

