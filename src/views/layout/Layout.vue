<template>
  <div class="bg_first_theme_color w-screen h-screen p-0 m-0">
    <HeaderBar class="header_container" />
    <MainBar class="main_container">
      <template #footerBar>
        <FooterBar />
      </template>
    </MainBar>
    <Cart />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from './child/HeaderBar.vue';
import MainBar from './child/MainBar.vue';
import FooterBar from './child/FooterBar.vue';
import Cart from '@/views/watches/child/Cart.vue';
</script>
