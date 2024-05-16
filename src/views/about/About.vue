<template>
  <div class="w_full flex justify-center items-center pt-6 flex-col">
    <div class="w_70 flex justify-center items-center flex img_about_banner h-80">
      <p class="text-center text-white font-bold text-3xl">ABOUT</p>
    </div>
    <p class="text-slate-50 text-4xl font-bold pt-10 pb-4 text-center">Our Story Is Your Story</p>
    <el-divider border-style="double" />
    <p class="pt-4 text-slate-400 w_60 text-center"> Founded in 1980, Otis is a lifestyle brand creating reimagined
      classics coupled with modern elements. Each timepiece is designed to be cherished—to collect stories, to live a
      long life, and to be rediscovered season after season. With a vision anchored in self-expression, Otis aims to
      form inclusive collections, collaborations, and conversations—celebrating individuality and ever-evolving
      personal style. </p>
    <div class="flex w_70 pt-8" :class="{ 'flex-col': isMobile }">
      <div class="img_about_left" :class="[isMobile ? 'w_100' : 'w_50', { 'mr-5': isDesktop }]" />
      <div class="flex justify-center items-center flex-col" :class="[isMobile ? 'w_100' : 'w_50', { 'pt-5': isMobile }]">
        <p class="text-slate-50 text-3xl text-center">We are a lifestyle brand</p>
        <el-divider border-style="double" />
        <p class="pt-4 text-slate-400 text-center mx-5">
          We are advocates for individuality. At the core of Otis, we
          seek to inspire, continually exploring new ways to build upon our collaborative community and provide a
          platformto share the stories of passionate creators. </p>
        <router-link :to="{ name: 'watches' }">
          <el-button class="mt-5 bg_first_theme_color" type="warning" plain>SHOP NOW</el-button>
        </router-link>
      </div>
    </div>
    <div class="flex w_70 pt-8 pb-9" :class="{ 'flex-col': isMobile }">
      <div class="pb-5 flex justify-center items-center flex-col"
        :class="[isMobile ? 'w_100' : 'w_50', { 'pb-5': isMobile }]">
        <p class="text-slate-50 text-3xl text-center">The Otis standard</p>
        <el-divider border-style="double" />
        <p class="pt-4 text-slate-400 text-center mx-5">
          We're on a mission to make the most out of life—we believe in pursuing progression and making time for the
          things that bring real value into the world. Ultimately, Otis aims to spark and encourage cultivated
          conversation while building a versatile and spirited community.
        </p>
        <router-link :to="{ name: 'watches' }">
          <el-button class="mt-5 bg_first_theme_color" type="warning" plain>SHOP NOW</el-button>
        </router-link>
      </div>
      <div class="img_about_right" :class="[isMobile ? 'w_100' : 'w_50', { 'ml-5': isDesktop }]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { isMobile, isDesktop } = storeToRefs(store);

</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0.4;
  }
}

$about_img: 'right', 'left';

@each $item in $about_img {
  .img_about_#{$item} {
    height: 400px;
    background-image: url('@/assets/about#{$item}.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .img_about_#{$item}:hover {
    animation: fadeIn ease 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}

.img_about_banner {
  background-image: url('@/assets/aboutBanner.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

:deep(.el-divider) {
  width: 100px;
  border-color: rgb(245 158 11);
}
</style>