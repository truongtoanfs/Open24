<template>
    <TheHeader @changeTheme="changeTheme" :class="primaryTheme" />
    <router-view :class="primaryTheme" />
</template>

<script>
import { onBeforeMount, ref } from "@vue/runtime-core";
import TheHeader from "./components/TheHeader.vue";
export default {
    components: {
        TheHeader,
    },
    setup() {
        let primaryTheme = ref("blue-theme");

        onBeforeMount(() => {
            if (!localStorage.primaryTheme) {
                localStorage.setItem("primaryTheme", primaryTheme.value);
            } else {
                primaryTheme.value = localStorage.getItem('primaryTheme');
            }
        });

        function changeTheme(theme) {
            primaryTheme.value = theme;
            localStorage.setItem("primaryTheme", theme);
        }
        return {
            primaryTheme,
            changeTheme
        }
    },
    
};
</script>

<style>
</style>