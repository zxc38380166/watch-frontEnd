<template>
  <div class="flex justify-center items-center bg_order_completed flex-col">
    <img src="@/assets/thankyou.svg" alt="Thank You" class="py-12 px-9 img_thankyou">
    <div class="w_85 h-28 bg_order_number flex justify-center items-center flex-col">
      <p class="text-gray-400 ">ORDERNUMBER :</p>
      <p class="text-slate-200 font-bold">{{ route.params.id }}</p>
      <el-button type="success" class="my-2 btn_payment_completed" size="small" round>PAYMENT COMPLETED</el-button>
    </div>
    <p class="py-9 px-3 text-white text-center font-bold" :class="isMobile ? 'text-lg' : 'text-2xl'">
      Thanks for being awesome, <br> we hope you enjoy your purchase!
    </p>
    <RouterLink :to="{ name: 'watches' }">
      <el-button type="warning" class="btn_continue_shop mb-14" size="large">
      <el-icon>
        <ArrowLeftBold />
      </el-icon>
      <span>
        CONTINUE SHOP
      </span>
    </el-button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useCounterStore();
const { isMobile } = storeToRefs(store);

</script>

<style lang="scss" scoped>
.bg_order_completed {
  background-color: rgb(24, 27, 39);
}

.bg_order_number {
  background-color: rgb(46, 51, 66);
}

:deep(.btn_payment_completed) {
  background-color: rgb(47, 77, 80);
}

.btn_continue_shop {
  background-color: rgb(24, 27, 39);
}

.img_thankyou {
  max-height: 800px;
  max-width: 800px;
}
</style>