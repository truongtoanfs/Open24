<template>
    <div class="fixed inset-0 z-20 overflow-y-auto flex items-start justify-center">
        <div @click="$emit('closeModal')" class="fixed inset-0 bg-black bg-opacity-30" />
        <div :class="responsiveSize" class="relative mt-16 mb-6 mx-3 w-full rounded bg-white">
            <div class="flex items-center justify-between bg-open24-main bg-open24-main-gradient text-open24-accent text-lg pl-4">
                <h2 class="font-medium">
                    <slot name="modal-title"></slot>
                </h2>
                <span @click="$emit('closeModal')" class="px-4 py-1.5 cursor-pointer hover:bg-black hover:bg-opacity-10"><i class="fas fa-times"></i></span>
            </div>
            <div class="px-4 pt-5 pb-3 font-medium text-sm text-333 text-left" :class="[requiredTwoCols ? 'xl:grid xl:grid-cols-2 gap-x-4' : '']">
                <slot name="modal-content"></slot>
            </div>
            <div class="px-4 pt-4 pb-5 flex items-center justify-end">
                <slot name="modal-footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            modalSize: String,
            requiredTwoCols: Boolean,
        },
        emits: ["closeModal"],
        setup({modalSize}) {
            const responsiveClass = {
                sm: "max-w-md",
                md: "sm:w-150",
                lg: "sm:max-w-xl lg:max-w-4xl"
            }
            const responsiveSize = responsiveClass[modalSize];
            return {
                responsiveSize,
            }
        }
    }
</script>

