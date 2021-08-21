<template>
    <div>
        <div class="fixed top-10 right-0 z-20 w-72 sidebar-height bg-open24-base border-l border-gray-300 shadow-xl xl:static xl:w-60">
            <div class="p-1.5 sidebar-content-height">
                <slot></slot>
            </div>
            <div class="absolute inset-x-0 bottom-0 text-white font-medium text-center px-3 pt-3 pb-5 border-t border-gray-300 xl:hidden">
                <BaseButton @click="$emit('closeSidebar')" class="bg-red-500 mr-2 w-17">Hủy bỏ</BaseButton>
                <BaseButton class="bg-open24-main w-17" @click="$emit('collapseAll')">{{ isCollapseAll ? 'Mở rộng' : 'Thu gọn'}}</BaseButton>
            </div>
        </div>
        <div @click="$emit('closeSidebar')" class="fixed top-10 bottom-0 inset-x-0 z-10 bg-black bg-opacity-30 xl:hidden"></div>
    </div>
</template>

<script>
    import BaseButton from '../components/BaseButton.vue';
    export default {
        props: {
            isCollapseAll: Boolean,
        },
        components: {
            BaseButton,
        },
        emits: ['closeSidebar', 'collapseAll'],
    }
</script>

<style scoped>
    .sidebar-height {
        height: calc(100vh - 40px);
    }
    .sidebar-content-height {
        max-height: calc(100% - 65px);
        overflow-y: auto;
    }
    .w-17 {
        width: 68px;
    }

    @media screen and (min-width: 1280px) {
        .sidebar-height {
            height: initial;
        }
        .sidebar-content-height {
            max-height: initial;
        }
    }
</style>
