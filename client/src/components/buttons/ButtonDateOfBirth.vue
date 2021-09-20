<template>
    <div @clickout="isShowDropdown = false" class="relative">
        <div @click="isShowDropdown = !isShowDropdown, orderSelect = 'day'" class="h-full flex items-center justify-start text-gray-400 font-normal">
            <span :class="(orderSelect === 'day' || selectedDay !== 'DD') ? 'text-open24-base' : ''">{{ selectedDay }}/</span>
            <span :class="(orderSelect === 'month' || selectedMonth !== 'MM') ? 'text-open24-base' : ''">{{ selectedMonth }}/</span>
            <span :class="(orderSelect === 'year' || selectedYear !== 'YYYY') ? 'text-open24-base' : ''">{{ selectedYear }}</span>
        </div>
        <div v-if="isShowDropdown" class="absolute top-8 -left-px -right-px z-50 bg-open24-base border border-gray-300 shadow-lg">
            <h4 class="text-center text-gray-600 py-2">{{ dropdownTitle }}</h4>
            <div v-if="orderSelect === 'day'" class="grid grid-cols-6 gap-y-1 px-1.5 pt-2 pb-5 md:px-16 lg:px-20 lg:gap-y-4 xl:gap-y-1 xl:px-1.5">
                <div v-for="day in days" :key="day" class="text-center">
                    <button @click="selectedDay = day, orderSelect = 'month'" class="w-full py-0.5 hover:bg-gray-200 rounded-sm cursor-default xl:py-1">{{ day }}</button>
                </div>
            </div>
            <div v-if="orderSelect === 'month'" class="grid grid-cols-3 gap-y-1 px-1 pt-2 pb-5 md:px-16 lg:gap-y-4 xl:gap-y-1 xl:px-2">
                <div v-for="(month, index) in months" :key="index" class="text-center">
                    <button @click="selectedMonth = month.shortMonth, orderSelect = 'year'" class="w-full py-1.5 hover:bg-gray-200 rounded-sm cursor-default">{{ month.longMonth }}</button>
                </div>
            </div>
            <div v-if="orderSelect === 'year'" class="grid grid-cols-5 gap-y-1 px-1 pt-2.5 mb-3 max-h-64 overflow-auto md:px-9 lg:gap-y-4 xl:gap-y-1 xl:px-1.5">
                <div v-for="(year, index) in years" :key="index" class="text-center">
                    <button @click="selectedYear = year, orderSelect = -1, isShowDropdown = false" class="w-full py-0.5 hover:bg-gray-200 rounded-sm cursor-default">{{ year }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
export default {
    setup() {
        const isShowDropdown = ref(false);
        const orderSelect = ref(-1);
        const dropdownTitle = ref('');
        
        watch(orderSelect, () => {
            if(orderSelect.value === 'day') {
                dropdownTitle.value = 'Chọn một ngày';
            } else if(orderSelect.value === 'month') {
                dropdownTitle.value = 'Chọn một tháng';
            } else {
                dropdownTitle.value = 'Chọn một năm';
            }
        })
        
        const days = [];
        const selectedDay = ref('DD');
        for(let i = 1; i <= 31; i++) {
            const day = i < 10 ? '0' + i : i;
            days.push(day);
        }
        

        const months = [];
        const selectedMonth = ref('MM');
        for(let i = 1; i <= 12; i++) {
            const shortMonth = i < 10 ? '0' + i : i;
            const longMonth = 'Tháng ' + i;
            months.push({
                shortMonth,
                longMonth,
            });
        }
        
        const years = [];
        const selectedYear = ref('YYYY');
        const currentYear = new Date().getFullYear();
        for(let i = currentYear; i >= 1900; i--) {
            years.push(i);
        }

        return {
            days,
            months,
            years,
            selectedDay,
            selectedMonth,
            selectedYear,
            isShowDropdown,
            orderSelect,
            dropdownTitle,
        }
    },
}
</script>
