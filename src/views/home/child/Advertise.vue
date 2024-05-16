<template>
  <div class="flex justify-center items-center w_100 mt-2">
    <div class="flex justify-center items-center"
      :class="[{ 'flex-col': !isDesktop }, `w_${isBigDesktop ? '70' : '90'}`]">
      <div v-for="item in advertiseData" @click="router.push({ name: 'watches' })" :key="item.title" :class="[
        isDesktop ? 'w_33 h-60' : 'w_90 h-40',
        `advertise_${item.title.replace(/\s*/g, '')}`
      ]" class=" my-1 relative">
        <div class="absolute top_40 left_20">
          <el-button type="info" size="small" round>
            <p class="text-sm">{{ replaceStrIndexToUpperCase(item.title, 0) }}</p>
          </el-button>
          <p class="text-white pt-3 font-bold" :class="isDesktop ? 'text-xl' : 'text-sm'">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { ref, Ref } from 'vue';
import { replaceStrIndexToUpperCase } from '@/common/common';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useCounterStore();
const { isDesktop, isBigDesktop } = storeToRefs(store);

const advertiseData: Ref<{
  title: string;
  description: string;
}[]> = ref([
  {
    title: 'most Popular',
    description: 'SALE FOR MEN'
  },
  {
    title: 'watch Sale',
    description: 'UPTO 25% OFF'
  },
  {
    title: 'hot Styles',
    description: 'DISCOUNT ON WATCH'
  },
])

</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

$advertiseData: 'mostPopular', 'watchSale', 'hotStyles';

@each $item in $advertiseData {
  .advertise_#{$item} {
    cursor: pointer;
    opacity: 0.5;
    background-image: url('@/assets/#{$item}.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto;
    background-blend-mode: multiply;
  }

  .advertise_#{$item}:hover {
    animation: fadeIn ease 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}
</style>