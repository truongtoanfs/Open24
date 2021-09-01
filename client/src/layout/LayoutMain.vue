<template>
    <div class="p-3.5 xl:flex xl:pl-0">
        <div :class="[isOpenSidebar ? 'block' : 'hidden', 'xl:block xl:mr-1.5']">
            <div class="fixed top-10 right-0 z-20 w-72 sidebar-height bg-open24-base border-l border-gray-300 shadow-xl xl:static xl:w-60">
                <div class="p-1.5 sidebar-content-height">
                    <slot name="sidebar" :isCollapseAll="isCollapseAll"></slot>
                </div>
                <div class="absolute inset-x-0 bottom-0 text-white font-medium text-center px-3 pt-3 pb-5 border-t border-gray-300 xl:hidden">
                    <base-button @click="isOpenSidebar = false" class="bg-red-500 mr-2 w-17">Hủy bỏ</base-button>
                    <base-button class="bg-open24-main w-17" @click="isCollapseAll = !isCollapseAll">{{ isCollapseAll ? 'Mở rộng' : 'Thu gọn'}}</base-button>
                </div>
            </div>
            <div @click="isOpenSidebar = false" class="fixed top-10 bottom-0 inset-x-0 z-10 bg-black bg-opacity-30 xl:hidden"></div>
        </div>
        <div class="w-full">
            <slot name="page-title"></slot>
            <div class="md:flex md:justify-between">
                <div class="relative flex items-center mb-3">
                    <slot name="control-buttons-group"></slot>
                </div>
                <div class="flex">
                    <slot name="table-search"></slot>
                    <base-button @click="isOpenSidebar = !isOpenSidebar" class="bg-open24-main bg-open24-main-gradient hover:bg-none ml-1.5 xl:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                        </svg>
                    </base-button>
                </div>
            </div>
            <slot name="main-table"></slot>
        </div>
        <slot name="modal-section"></slot>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import BaseButton from '../components/base/BaseButton.vue';

export default {
    components: {
        BaseButton,
    },
    setup() {
        const stateTracking = reactive({
            isOpenSidebar: false,
            isCollapseAll: false,
        })

        return {
            ...toRefs(stateTracking),
        }
    }
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
