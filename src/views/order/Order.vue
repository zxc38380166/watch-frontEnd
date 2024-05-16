<template>
  <div class="w-full flex justify-center items-center py-6 flex-col">
    <div class="w_70 flex justify-center items-center flex img_order_banner">
      <p class="text-center text-white font-bold text-3xl">ORDER</p>
    </div>
    <div class="w_70">
      <Steps />
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import Steps from './child/Steps.vue'
</script>

<style lang="scss" scoped>
.img_order_banner {
  height: 300px;
  background-image: url('@/assets/orderBanner.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
