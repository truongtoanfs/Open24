<template>
    <div>
        <div @click="isCollapseItem = !isCollapseItem"  class="flex items-center h-8 text-sm  bg-gray-400 bg-opacity-60 rounded-sm">
            <span class="text-base pl-3"><slot name="header-icon"></slot></span>
            <h4 class="font-semibold px-2 select-none">{{ headerText }}</h4>
        </div>
        <Accordition>
            <div v-if="!isCollapseItem" class="pt-1 px-6">
                <slot name="content"></slot>
            </div>
        </Accordition>
    </div>
</template>

<script>
import { ref } from 'vue';
import Accordition from './Accordition.vue';

    export default {
        props: {
            headerText: String,
            isCollapseAll: Boolean,
        },
        components: {
            Accordition
        },
        setup({ isCollapseAll }) {
            const isCollapseItem = ref(isCollapseAll);
            
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

