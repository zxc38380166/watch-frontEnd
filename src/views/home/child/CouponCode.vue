<template>
  <div class="h_50 w_100 bg_coupon_code mt-4 px-3 flex flex-col justify-center items-center">
    <p class="text-amber-400 text-center" :class="isDesktop ? 'text-lg' : 'text-base'">EXCLUSIVE DEAL</p>
    <p class="text-white text-center font-bold pt-2" :class="isDesktop ? 'text-xl' : 'text-lg'">
      25% Off on All products at Otis Store
    </p>
    <p class="text-gray-400 px-5 text-center pt-3" :class="isDesktop ? 'text-lg' : 'text-base'">
      Get an incredible 25% discount on all types of watches at Otis Store. Only for single use.
    </p>
    <div @click="copyCouponCode" class="mt-3 py-3 text-white flex justify-center items-center border border-dashed border-white cursor-pointer"
      :class="isDesktop ? 'w_50' : 'w_80'">
      <button class="btn_coupon">
        <p class="text text-white">GET COUPON CODE</p>
      </button>
      <el-icon class="ml-3">
        <CopyDocument />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { inject } from 'vue';
import { ElNotification } from 'element-plus';
import { globalKey, globalData } from '@/global';

const global = inject(globalKey, globalData);
const store = useCounterStore();
const { isDesktop } = storeToRefs(store);

async function copyCouponCode(): Promise<void> {
  try {
    const codeDom: HTMLElement = document.createElement('p'); // 創建一個dom
    var code: Text = document.createTextNode(global.COUPONCODE); // 將值寫入dom中
    codeDom.appendChild(code);
    await navigator.clipboard.writeText(codeDom.textContent as string); // 寫入系統剪貼中
    ElNotification({
      message: 'copy successfully !',
      type: 'success',
      duration: 3000
    })
  } catch (err) {
    ElNotification({
      message: 'Copy failed! Please check if the device supports one-click copy。',
      type: 'error',
      duration: 3000
    })
  }
}

</script>

<style lang="scss" scoped>
.bg_coupon_code {
  background-image: url('@/assets/couponCodeBanner.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@keyframes fadeInAnimation {
  0% {
    opacity: 0.1;
  }

  100% {
    opacity: 1;
  }
}

.btn_coupon {
  animation: fadeInAnimation ease 1.2s;
  animation-iteration-count: infinite;
}
</style>