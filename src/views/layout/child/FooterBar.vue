<template>
  <div class="bg_footer py-8 flex flex-col items-center">
    <template v-if="isDesktop">
      <div
        class="bg_benefits flex justify-center items-center introduce_contain border-solid border border-slate-600 h_37 w_80 py-7">
        <div class="w_31 flex justify-center px-6">
          <el-icon size="45" color="rgb(211,212,216)">
            <ShoppingBag />
          </el-icon>
          <div class="pl-3 ">
            <p class="text-slate-200">Free Shipping</p>
            <p class="text-slate-400">Shipping for orders over $99</p>
          </div>
        </div>
        <el-divider direction="vertical" class="shopping_guidedi_vider" />
        <div class="w_31 flex justify-center px-3">
          <el-icon size="45" color="rgb(211,212,216)">
            <Present />
          </el-icon>
          <div class="pl-3">
            <p class="text-slate-200">Money Return</p>
            <p class="text-slate-400">30 days for free return</p>
          </div>
        </div>
        <el-divider direction="vertical" class="shopping_guidedi_vider" />
        <div class="w_31 flex justify-center px-6">
          <el-icon size="45" color="rgb(211,212,216)">
            <Money />
          </el-icon>
          <div class="pl-3 ">
            <p class="text-slate-200">Online Support</p>
            <p class="text-slate-400">Support 24 hours a day</p>
          </div>
        </div>
      </div>
      <div class="flex w_80 justify-center pt-5">
        <div class="w_32 text-center">
          <p class="font-bold text-slate-300">ABOUT Otis</p>
          <p class="text-slate-400">Otis Store is a Modern Fully Responsive Retina Ready Otis Store theme. Start your
            Store right away with Otis Store.
          </p>
        </div>
        <div class="w_32 text-center px-3">
          <p class="font-bold text-slate-300">CONTACT US</p>
          <el-icon color="rgb(203,213,225)" size="20">
            <Location />
          </el-icon>
          <span class="text-slate-400 text-sm pl-2">Dehua St., North Dist., Taichung</span> <br>
          <el-icon color="rgb(203,213,225)" size="20" class="py-2">
            <Phone />
          </el-icon><span class="text-slate-400 text-sm pl-2">0800-123-456</span><br>
          <el-icon color="rgb(203,213,225)" size="20">
            <Message />
          </el-icon><span class="text-slate-400 text-sm pl-2">zxc38380166@yahoo.com.tw</span>
        </div>
        <div class="w_32 text-center">
          <p class="font-bold text-slate-300">SHARE WITH US</p>
          <p class="text-slate-400 text-sm pb-2">Special offers on social networks</p>
          <el-icon class="cursor-pointer" color="rgb(203,213,225)" size="25">
            <Promotion />
          </el-icon>
        </div>
        <br>
      </div>
    </template>
    <el-divider border-style="double" class="w_80" />
    <div class="w_80 h-40">
      <p class="pt-3 text-center text-slate-400">© Otis Store. All Rights Reserved. by <span
          class="font-bold text-slate-300">Otis</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { isDesktop } = storeToRefs(store);

</script>

<style lang="scss" scoped>
:deep(.el-divider) {
  border-color: rgb(71 85 105);
}

.bg_footer {
  background-color: rgb(30, 34, 48);
}

.bg_benefits {
  background-color: rgb(26, 31, 50);
}
</style>