<template>
    <div class="relative shadow-sm">
        <span class="absolute inset-y-0 left-2 flex items-center text-sm"><i class="fas fa-search text-gray-700"></i></span>
        <input @click="highlightText($event)" v-model="filterInput" :placeholder="searchLabel" type="text" class="input pl-7">
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import highlightText from '../../composables/useHighlightText';
export default {
    props: {
        searchLabel: String,
    },
    setup(props, context) {
        const filterInput = ref('');
        watch(filterInput, () => {
            context.emit('filterInput', filterInput.value);
        })
        
        return {
            filterInput,
            highlightText,
        }
    },
}
</script>