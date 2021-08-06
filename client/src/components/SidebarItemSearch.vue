<template>
    <div>
        <div @click="isCollapseItem = !isCollapseItem"  class="flex items-center justify-between text-sm  bg-gray-400 bg-opacity-60">
            <div class="flex items-center">
                <span class="text-base pl-3"><slot name="header-icon"></slot></span>
                <h4 class="font-semibold px-2 select-none">{{ headerText }}</h4>
            </div>
            <span @click.stop="$emit('openModal')" class="py-1.5 px-3 cursor-pointer text-blue-600">
                <i class="fas fa-plus"></i>
            </span>
        </div>
        <slot name="modal-add-new"></slot>
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
        <slot name="modal-update"></slot>
    </div>
    <!--
        Tìm kiếm hãng xe:
            + liều có thể tìm kiếm theo nhiều hãng đc k?
            + có thể highlight những hãng xe dã chọn được không
     -->    
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { watch } from '@vue/runtime-core';
import Accordition from './Accordition.vue';

    export default {
        props: {
            headerText: String,
            searchLabel: String,
            filterData: Array,
        },
        components: {
            Accordition,
        },
        emits: ['openModalUpdate', 'openModal'],
        setup(props) {
            const sidebarItemsState = reactive({
                isCollapseItem: true,
            })  
            const filterInput = ref('');
            const carList = ref([]);
            
            watch(filterInput, (newValue, oldValue) => {
                if(newValue.length === 0) {
                    carList.value = props.filterData;
                } else {
                    carList.value = props.filterData.filter(car => {
                        return car.name.toUpperCase().includes(newValue.toUpperCase());
                    })
                }
            }, {immediate: true})

            return {
                ...toRefs(sidebarItemsState),
                filterInput,
                carList,
            }
        }
    }
</script>

