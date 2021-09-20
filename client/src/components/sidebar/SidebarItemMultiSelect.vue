<template>
    <div>
        <div @click="isCollapseItem = !isCollapseItem" class="flex items-center text-sm bg-gray-400 bg-opacity-60">
            <span class="text-base ml-3 mr-2 w-5 text-center">
                <slot name="header-icon"></slot>
            </span>
            <h4 class="font-semibold select-none">{{ headerText }}</h4>
        </div>
        <accordition>
            <div v-if="!isCollapseItem" class="mx-3">
                <base-input-multi-select :searchLabel="searchLabel" :filterData="filterData" :keywordFilter="keywordFilter" />
            </div>
        </accordition>
    </div>
</template>

<script>
import Accordition from '../Accordition.vue';
import removeAccents from '/Open24/client/src/composables/useRemoveAccents';
import BaseInputMultiSelect from '../base/BaseInputMultiSelect.vue';
import { ref, watch } from 'vue';

export default {
    props: {
        headerText: String,
        searchLabel: String,
        filterData: Array,
        isCollapseAll: Boolean,
        keywordFilter: String,
    },
    components: {
        Accordition,
        BaseInputMultiSelect,
    },
    setup({ isCollapseAll }) {
        let isCollapseItem = ref(isCollapseAll);

        return {
            isCollapseItem,
        }
    },
    watch: {
        isCollapseAll(val) {
            this.isCollapseItem = val;
        },
    },
}
</script>

