<template>
    <div class="fixed inset-0 z-10 overflow-y-auto flex items-start justify-center">
        <div @click="$emit('closeModal')" class="fixed inset-0 bg-black bg-opacity-30" />
        <div :class="responsiveSize" class="relative mt-16 mb-6 mx-3 w-full rounded bg-white">
            <div class="flex items-center justify-between text-white bg-primary text-lg pl-4">
                <h2 class="font-medium">
                    <slot name="modal-title"></slot>
                </h2>
                <span @click="$emit('closeModal')" class="px-4 py-1.5 cursor-pointer"><i class="fas fa-times"></i></span>
            </div>
            <div class="px-4 pt-5 pb-3 font-medium text-sm text-333 text-left">
                <slot name="modal-content"></slot>
            </div>
            <div class="px-4 pt-4 pb-5 flex items-center justify-end">
                <slot name="modal-footer"></slot>
            </div>
        </div>
    </div>
    <!-- How to close modal in component -->
</template>

<script>
    export default {
        props: {
            modalSize: String,
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

<style scoped>

</style>