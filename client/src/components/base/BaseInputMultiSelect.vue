<template>
    <div @clickout="isOpenDropdown = false" class="relative flex-cover">
        <div @click="isOpenDropdown = !isOpenDropdown" class="w-full min-h-8 leading-6 font-13 font-normal border border-solid border-gray-300 rounded">
            <ul class="flex flex-wrap items-center h-full">
                <li v-if="selectedItems.length === 0" class="bg-gray-200 h-full leading-7 mx-px my-0.5 rounded flex items-center">
                    <span class="px-4">Tất cả</span>
                </li>
                <li v-for="item in selectedItems" :key="item.id" class="bg-gray-200 h-full leading-7 mx-px my-0.5 rounded flex items-center">
                    <span class="pl-2.5">{{ item[keywordFilter] }}</span>
                    <span @click="updateItem(item)" class="px-2.5 hover:text-red-500"><i class="fas fa-times"></i></span>
                </li>
            </ul>
        </div>
        <div v-if="isOpenDropdown" class="absolute z-20 py-1 px-2 w-full max-h-56 overflow-auto rounded-md bg-white shadow-lg text-sm font-normal">
            <div class="relative border-b border-solid border-gray-300 mt-0.5">
                <span class="absolute inset-y-0 left-0 flex items-center text-sm"><i class="fas fa-search text-gray-700"></i></span>
                <input :placeholder="searchLabel" v-model="filterInput" type="text" class="w-full h-8 pl-6 border-0 focus:outline-none placeholder-gray-500">
            </div>
            <button @click="selectAllBranch(), filterInput = ''" class="px-3 py-1 rounded border-b border-solid border-gray-200 hover:bg-gray-200">TẤT CẢ</button>
            <ul class="max-h-36 overflow-y-auto divide-y divide-gray-300">
                <li v-for="item in filterList" :key="item.id" @click="updateItem(item), filterInput = ''" class="relative py-1.5 px-2 cursor-default select-none hover:bg-gray-200 rounded-sm">
                    <span>
                        {{ item[keywordFilter] }}
                    </span>
                    <span v-if="selectedItemsIndex.includes(item.id)" class="absolute inset-y-0 right-0 flex items-center pr-4">
                        <i class="fas fa-check text-blue-600" />
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
    props: {
        searchLabel: String,
        filterData: Array,
        keywordFilter: String,
    },
    setup({ filterData, keywordFilter }) {
        const isOpenDropdown = ref(false);

        const initialList = filterData;
        const filterList = ref(initialList);
        const selectedItems = ref([]);
        const selectedItemsIndex = ref([]);

        const filterInput = ref('');

        watch(filterInput, (typedValue) => {
            if(typedValue.length == 0) {
                filterList.value = initialList;
            } else {
                filterList.value = initialList.filter(item => {
                    const itemNameNoAccents = removeAccents(item[keywordFilter]);
                    const inputNoAccents = removeAccents(typedValue);
                    return itemNameNoAccents.toUpperCase().includes(inputNoAccents.toUpperCase());
                })
            }
        })
        
        function updateItem(clickedItem) {
            const isSelectedItem = selectedItems.value.some(item => item[keywordFilter] == clickedItem[keywordFilter]);
            const indexInSelectedList = selectedItemsIndex.value.indexOf(itemIndex);
            
            if(isSelectedItem) {
                selectedItemsIndex.value.splice(indexInSelectedList, 1);
                selectedItems.value.splice(indexInSelectedList, 1);
            } else {
                selectedItemsIndex.value.push(itemIndex);
                selectedItems.value.push(initialList[itemIndex]);
            }
        }
        
        function selectAllBranch() {
            selectedItemsIndex.value = [];
            selectedItems.value = [];
        }

        return {
            isOpenDropdown,
            filterList,
            selectedItems,
            selectedItemsIndex,
            updateItem,
            selectAllBranch,
            filterInput,
        }
    },
}
</script>