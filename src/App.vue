<template>
  <RouterView />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { globalKey, globalData } from './global'

provide(globalKey, globalData);

</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
  user-select:none; 
  -webkit-user-select:none; /* for Chrome、Safari */
  -moz-user-select:none; /* for Mozilla、Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>