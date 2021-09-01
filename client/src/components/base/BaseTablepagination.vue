<template>
    <div class="bg-gray-400 bg-opacity-50 leading-6 py-1.5 px-3 md:flex md:items-center md:justify-between">
        <div class="flex items-center justify-center">
            <label class="font-medium mr-2">Số bản ghi:</label>
            <select v-model.number="selectedRecordValue" class="h-8 w-28 px-2 border border-gray-300 rounded focus:outline-none focus:shadow-md focus:border-blue-400" name="selectedRecordValue">
                <option v-for="(optionValue, optionIndex) in TABLE_OPTION_VALUES" :key="optionIndex" :value="optionValue">{{ optionValue }}</option>
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
                <button @click="changeData(activedPaginationButton + 1)" :class="activedPaginationButton === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-open24-main hover:text-open24-accent'" class="px-3 h-7 rounded py-px text-sm"><i class="fas fa-caret-right"></i></button>
                <button @click="changeData(totalPages)" :class="activedPaginationButton === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-open24-main hover:text-open24-accent'" class="px-3 h-7 rounded py-px"><i class="fas fa-step-forward"></i></button>
            </div>
            <p class="text-center ml-1">{{ pageView }}</p>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { TABLE_OPTION_VALUES } from '../../constants/appConstants';

export default {
    props: {
        tablePaginationData: Object,
    },
    setup(props) {
        const paginationButtonList = props.tablePaginationData.ListPage;
        const pageView = props.tablePaginationData.PageView;
        const totalPages = props.tablePaginationData.NumberOfPage;

        const selectedRecordValue = ref(TABLE_OPTION_VALUES[0]);
        watch(selectedRecordValue, (newValue) => {
            /* fetch data from Api */
            console.log('fetch data from Api');
        })

        const activedPaginationButton = ref(1);
        function changeData(buttonValue) {
            console.log(buttonValue);
            if (buttonValue < 1) {
                return;
            } else if (buttonValue > props.totalPages) {
                return;
            }
            activedPaginationButton.value = buttonValue;
            /* fetch data from Api */
            console.log('fetch data from APi');
        }

        return {
            paginationButtonList,
            pageView,
            totalPages,
            selectedRecordValue,
            TABLE_OPTION_VALUES,
            changeData,
            activedPaginationButton,
        }
    }
}
</script>