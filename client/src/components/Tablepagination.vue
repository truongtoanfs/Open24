<template>
    <div class="bg-gray-400 bg-opacity-50 leading-6 py-2.5 px-3 md:flex md:items-center md:justify-between">
        <div class="flex items-center justify-center">
            <label class="font-medium mr-2">Số bản ghi:</label>
            <select v-model.number="selectedRecordValue" class="h-8 w-28 px-2 border border-gray-300 rounded focus:outline-none focus:shadow-md focus:border-blue-400" name="selectedRecordValue">
                <option v-for="(optionValue, optionIndex) in tableOptionsValue" :key="optionIndex" :value="optionValue">{{ optionValue }}</option>
            </select>
        </div>
        <div class="md:flex md:items-center">
            <div class="flex items-center justify-center text-open24-main my-2">
                <button @click="changeData(1)" :class="activedPaginationButton === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-open24-main hover:text-open24-accent'" class="px-3 h-7 rounded py-px"><i class="fas fa-step-backward"></i></button>
                <button @click="changeData(activedPaginationButton - 1)" :class="activedPaginationButton === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-open24-main hover:text-open24-accent'" class="px-3 h-7 rounded py-px text-sm"><i class="fas fa-caret-left"></i></button>
                <div>
                    <template v-for="buttonValue in paginationButtonList" :key="buttonValue" >
                        <button @click="changeData(buttonValue)" :class="activedPaginationButton === buttonValue ? 'bg-open24-main bg-open24-main-gradient text-open24-accent' : '' " class="px-3 mx-0.5 h-7 hover:bg-open24-main hover:text-open24-accent rounded py-px">{{ buttonValue }}</button>
                    </template>
                </div>
                <button @click="changeData(activedPaginationButton + 1)" :class="activedPaginationButton === paginationButtonList.length ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-open24-main hover:text-open24-accent'" class="px-3 h-7 rounded py-px text-sm"><i class="fas fa-caret-right"></i></button>
                <button @click="changeData(paginationButtonList.length)" :class="activedPaginationButton === paginationButtonList.length ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-open24-main hover:text-open24-accent'" class="px-3 h-7 rounded py-px"><i class="fas fa-step-forward"></i></button>
            </div>
            <p class="text-center">Hiển thị {{ tableMinRange }} - {{ tableMaxRange }} trên tổng số {{ tableData.length}} bản ghi</p>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
export default {
    props: {
        tableData: Array,
        rowsList2: Array,
    },
    setup({ tableData, rowsList2 }, context) {
        const tableOptionsValue = [10, 20, 30, 40, 50];
        const selectedRecordValue = ref(tableOptionsValue[0]);//giá trị đầu tiên trong d/s option
        const tableMaxRange = ref(tableOptionsValue[0]);
        const activedPaginationButton = ref(1);
        const tableMinRange = ref(1);
        const paginationButtonList = computed(function() {
            const paginationButtonAmount = Math.ceil(tableData.length / selectedRecordValue.value);
            const ButtonsArray = [];
            for (let i = 1; i <= paginationButtonAmount; i++) {
                ButtonsArray.push(i);
            }
            return ButtonsArray;
        })


        watch(selectedRecordValue, (newValue) => {
            activedPaginationButton.value = 1;
            rowsList2.value = tableData.filter(object => {
                return 0 <= object.id && object.id <= newValue;
            })
            tableMinRange.value = rowsList2.value[0].id;
            tableMaxRange.value = rowsList2.value[rowsList2.value.length - 1].id;
        })

        function changeData(buttonValue) {
            if (buttonValue < 1) {
                return;
            } else if (buttonValue > paginationButtonList.value.length) {
                return;
            }
            activedPaginationButton.value = buttonValue;
            rowsList2.value = tableData.filter(object => {
                return selectedRecordValue.value * (buttonValue - 1) < object.id && object.id <= selectedRecordValue.value * buttonValue;
            })
            tableMinRange.value = rowsList2.value[0].id;
            tableMaxRange.value = rowsList2.value[rowsList2.value.length - 1].id;
        }

        return {
            selectedRecordValue,
            tableOptionsValue,
            changeData,
            activedPaginationButton,
            paginationButtonList,
            tableMinRange,
            tableMaxRange,
        }
    }
}
</script>