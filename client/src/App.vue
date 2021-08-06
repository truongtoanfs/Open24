<template>
  <Header />
    <router-view/>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core';
import Header from './components/Header.vue';
export default {
  setup() {
    const primaryTheme = {
      name: 'indigo',
      primaryColor: '#1374ad',
      secondaryColor: '#19669a',
    };

    onBeforeMount(() => {
      if (!localStorage.primaryTheme) {
        localStorage.setItem('primaryTheme', JSON.stringify(primaryTheme));
      }
    })

  },
  components: {
    Header,
  }
}
</script>

<style>
  
</style>