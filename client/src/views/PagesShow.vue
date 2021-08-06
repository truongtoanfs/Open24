<template>
    <div class="page-content-height flex justify-center bg-gray-600 bg-opacity-50 pt-14">
        <h1 class=" text-gray-50 font-bold text-2xl ">{{ pageName.text }}</h1>
    </div>
</template>

<script>
    import {ref, watch} from 'vue';
    import { computed } from '@vue/runtime-core';
    import { navbarItems } from '../mixins/navbarItems';
    import { useRouter, useRoute } from 'vue-router';
    export default {
        setup() {
            const route = useRoute();
            const router = useRouter();
            
            const linksList = [
                {
                text: "Tổng quan",
                url: "/",
                },
                {
                text: "Bàn làm việc",
                url: "/banLamViec",
                },
            ]
            const pageName = ref(linksList[0]);
    
            navbarItems.forEach(navbarItem => {
                const navsList =  navbarItem.navList.map(list => {
                    return {
                        text: list.text,
                        url: list.url
                    }
                })
                linksList.push(...navsList);
            })
            watch( () => route.params.slug, (newValue, oldValue) => {
                if (newValue !== 'danhSachXe' && newValue !== '') {
                    pageName.value = linksList.find(link => {
                        return link.url === `/${newValue}`
                    })
                    console.log(pageName.value);
                }
            }, {immediate: true})
            
            return {
                pageName,
            }
        }
    }
</script>

<style scoped>
    .page-content-height {
        height: calc(100vh - 40px);
    }
</style>