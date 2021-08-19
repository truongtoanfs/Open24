<template>
    <transition name="accordion" @enter="startAnimation" @after-enter="endAnimation" @before-leave="startAnimation" @after-leave="endAnimation" mode="out-in">
        <slot></slot>
    </transition>
</template>

<script>
    export default {
        setup() {
            function startAnimation(el) {
                el.style.height = el.scrollHeight + "px";
            };
            function endAnimation(el) {
                el.style.height = "";
            }

            return {
                startAnimation,
                endAnimation
            }
        }
    }
</script>

<style>
    .accordion-enter-active,
    .accordion-leave-active {
        will-change: height, opacity;
        transition: height 0.4s, opacity 0.4s;
        overflow: hidden;
    }

    .accordion-enter-from,
    .accordion-leave-to {
        height: 0 !important;
        opacity: 0;
    }
</style>