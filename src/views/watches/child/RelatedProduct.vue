<template>
  <div class="flex">
    <el-divider content-position="left">
      <p class="font-bold">RELATED PRODUCT</p>
    </el-divider>
    <el-button @click="toogleShowData('-')" :disabled="showStartIndex === minIndex" color="rgb(57, 66, 90)"
      class="mt-2 ml-3" :icon="ArrowLeftBold" circle />
    <el-button @click="toogleShowData('+')" :disabled="showEndIndex === maxIndex" color="rgb(57, 66, 90)" class="mt-2"
      :icon="ArrowRightBold" circle />
  </div>
  <el-row v-if="isReady">
    <el-col v-for="item in showRelatedProduct" :span="isMobile ? 12 : 6" :class="isBigDesktop ? 'px-10' : 'px-1'"
      class="py-3 flex justify-center items-center">
      <el-card :body-style="cardStyle" :class="{ 'card_shadow_animation': isBigDesktop }">
        <img @click="toogleProductPage(item.title)" :src="item.imageUrl" class="cursor-pointer" />
        <div class="flex flex-col justify-center items-center">
          <p class="text-slate-400 pt-2 text-sm">{{ replaceStrIndexToUpperCase(item.title, 0) }}</p>
          <p class="text-slate-200 pt-1" :class="{ 'text-sm': isMobile }">{{ item.category }}</p>
          <p class="relative py-1 text-amber-500 text-bold text-lg">{{ formatThousandth(item.price) }}</p>
          <el-button @click="typeof cartData[item.id] === 'object'
            ? store.delCartItem(item.id)
            : store.addToCart(item)" :size="isBigDesktop ? 'default' : 'small'" color="rgb(24,27,46)"
            class="mx-9 mb-1">
            <el-icon :color="typeof cartData[item.id] === 'object' ? 'rgb(234 179 8)' : 'rgb(148 163 184)'" size="18"
              class="mr-1">
              <ShoppingCartFull v-if="typeof cartData[item.id] === 'object'" />
              <ShoppingCart v-else />
            </el-icon>
            <span :class="typeof cartData[item.id] === 'object' ? 'text-yellow-500' : 'text-slate-400'">
              Add to Cart
            </span>
          </el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ArrowLeftBold, ArrowRightBold, ShoppingCart } from '@element-plus/icons-vue'
import { apiGetProduct } from '@/api';
import { computed, ref, Ref, CSSProperties, watch, WatchStopHandle, ComputedRef } from 'vue';
import { replaceStrIndexToUpperCase, formatThousandth, shuffleArray } from '@/common/common';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useCounterStore();
const { isMobile, isBigDesktop, cartData } = storeToRefs(store);
const props = defineProps({
  category: {
    type: String,
    default: ''
  }
})


interface Data {
  title: string;
  category: string;
  price: number;
  imageUrl: string;
  id: number;
}
const cardStyle: CSSProperties = { backgroundColor: 'rgb(34, 39, 54)' }
const isReady: Ref<boolean> = ref(false);
const data: Ref<Array<Data>> = ref([]);
const getData: WatchStopHandle = watch(() => props.category, (value) => {
  apiGetProduct({ category: value })
    .then((response) => {
      data.value = response.data.filter((item: Data) => item.title !== route.params.productTitle);
      shuffleArray(data.value); // 把同系列的隨機洗牌
      getData(); // 第一次取得props時call api拿同系列 拿到資料後關閉watch
      isReady.value = true;
    })
    .catch(() => {
      isReady.value = false;
      ElNotification({
        title: 'Failed to load',
        message: 'Error occurs when loading, please refresh it later !',
        type: 'error',
        duration: 0
      })
    })
})

const showStartIndex: Ref<number> = ref(0);
const showEndIndex: Ref<number> = ref(4);
const minIndex: number = 0;
const maxIndex: ComputedRef<number> = computed(() => data.value.length - 1);
const showRelatedProduct: ComputedRef<Array<Data>> = computed(() =>
  data.value.slice(showStartIndex.value, showEndIndex.value)
);

function toogleShowData(operate: string): void {
  const operateValue: number = 1;
  switch (operate) {
    case '+':
      if (showEndIndex.value === maxIndex.value) {
        return;
      }
      showStartIndex.value += operateValue;
      showEndIndex.value += operateValue;
      break;
    case '-':
      if (showStartIndex.value === minIndex) {
        return;
      }
      showStartIndex.value -= operateValue;
      showEndIndex.value -= operateValue;
  }
}

async function toogleProductPage(title: string) {
  await router.push({ path: `/productPage/${title}` });
  window.location.reload();
}

</script>

<style lang="scss" scoped>
:deep(.el-button.is-disabled) {
  background-color: rgb(42, 48, 67);
  color: rgb(80, 87, 107);
  border: none;
}

:deep(.el-card) {
  border: none;
  box-shadow: none;
  border-radius: 0;
}

@keyframes card_shadow {
  100% {
    box-shadow: 0 0 30px $second_theme_color;
  }
}

:deep(.card_shadow_animation:hover) {
  animation-name: card_shadow;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
}
</style>