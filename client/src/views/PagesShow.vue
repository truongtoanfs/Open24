<template>
    <div class="page-content-height flex justify-center bg-gray-600 bg-opacity-50 pt-14">
        <h1 class=" text-gray-50 font-bold text-2xl">{{ pageName.PageTitle }}</h1>
    </div>
</template>

<script>
    import {ref, watch} from 'vue';
    import { computed } from '@vue/runtime-core';
    import { InitHeaderMenu } from '../data/';
    import { useRouter, useRoute } from 'vue-router';
    export default {
        setup() {
            const route = useRoute();
            const router = useRouter();
            
            const linksList = InitHeaderMenu.dataSoure.Menu;

            const pageName = ref(null);
    
            
            watch(() => route.params.slug, (newValue) => {
                if (newValue) {
                    linksList.forEach(link => {
                        if(link.url === newValue) {
                            pageName.value = link;
                        } else if (link.url === '') {
                            const item = link.SubMenu.find(subLink => {
                                return subLink.url === newValue;
                            })
                            if(item) {
                                pageName.value = item;
                            }
                        }
                        
                    })
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