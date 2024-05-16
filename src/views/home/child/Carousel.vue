<template>
  <div class="pt-5">
    <!-- 電腦版 -->
    <el-carousel v-if="isDesktop" @change="activeIndex = $event"
      :height="`${calculutePercentage(deviceSize.width, 20)}px`" type="card" trigger="click" :interval="5000">
      <el-carousel-item v-for="(item, index) in carouselData" :key="item.name">
        <div class="w-full h-full flex justify-start items-center" :class="item.name">
          <div v-if="activeIndex === index && isDesktop" class="w_50 absolute" :class="setCarouselPosition(index)">
            <p class="text-amber-400 text-sm">{{ item.type }}</p>
            <p class="text-white text-xl">{{ item.title }}</p>
            <p v-if="isBigDesktop" class="text-gray-400 text-sm w-64">{{ item.description }}
            </p>
            <router-link :to="{ name: 'watches' }">
              <el-button id="shopNow" size="small" plain type="warning" class="bg_first_theme_color mt-2">SHOP
                NOW</el-button>
            </router-link>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 手機板 -->
    <el-carousel v-else indicator-position="outside" height="150px" :interval="ToggleMilliseconds">
      <el-carousel-item v-for="(item, index) in carouselData" :key="item.name" :class="item.name">
        <div class="relative top_16 w-36" :class="setCarouselPosition(index)">
          <p class="text-amber-400 text-xs">{{ item.type }}</p>
          <p class="text-white text-sm">{{ item.title }}</p>
          <router-link :to="{ name: 'watches' }">
            <el-button id="shopNow" size="small" plain type="warning" class="bg_first_theme_color mt-2">
              SHOP NOW
            </el-button>
          </router-link>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template> 

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { calculutePercentage } from '@/common/common'

const store = useCounterStore();
const { deviceSize, isDesktop, isBigDesktop } = storeToRefs(store);
const ToggleMilliseconds: number = 5000;

const activeIndex: Ref<number> = ref(0);
const carouselData: Array<{
  name: string;
  type: string;
  title: string;
  description: string;
}> = reactive([
  {
    name: 'carousel_One',
    type: 'Built for men',
    title: 'An Extraordinary Classic',
    description: 'This is the best in class effective watches from the luxury brand watch.co and Gizmo has put into. Lot of efforts put in these high quality watches. '
  },
  {
    name: 'carousel_Two',
    type: 'Empire Collection',
    title: 'The Watch Everyone Desires!',
    description: 'The best in class elegant watches from the luxury brand Swiss Eagle high-quality watches into which a lot of care has gone in. '
  },
  {
    name: 'carousel_Three',
    type: 'Blacktop Series - 47mm',
    title: 'New Trending Collection',
    description: 'Expanding the offering is the choice between a leather strap or a metal bracelet, bringing the total new look.  '
  },
  {
    name: 'carousel_Four',
    type: 'MODERN SPORT SERIES - 42 MM',
    title: 'Stylish eternal wrist watches',
    description: 'I did not even know that there were any better conditions to escape to, but I was  more than willing to take my chances.'
  },
])

function setCarouselPosition(index: number): string {
  if (isDesktop.value) {
    return (index + 1) % 2 === 0
      ? `right_${calculutePercentage(deviceSize.value.width, 0.16, true)}`
      : `left_${calculutePercentage(deviceSize.value.width, 0.65, true)}`
  }
  return (index + 1) % 2 === 0 ? 'right_-45' : 'left_30'
}
</script>

<style lang="scss" scoped>
$carousel_Data: 'One', 'Two', 'Three', 'Four';

@each $item in $carousel_Data {
  .carousel_#{$item} {
    background-image: url('@/assets/carousel#{$item}.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>