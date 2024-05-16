<template>
  <div class="w_100 flex justify-center flex-col items-center py-6">
    <div class="w_70 flex justify-center items-center flex img_product_page_banner h-80">
      <p class="text-center text-white font-bold text-3xl">PRODUCT PAGE</p>
    </div>
    <el-row v-if="isReady" class="w_70 py-4">
      <el-col :span="isMobile ? 24 : 12">
        <div class="px-3 flex justify-center items-center w_100 h_100">
          <el-image :src="data.imageUrl" class="h_80 h_80" fit='contain' />
        </div>
      </el-col>
      <el-col :span="isMobile ? 24 : 12">
        <div class="pl-3 flex justify-center flex-col w_100 h_100" :class="{ 'items-center': isMobile }">
          <p class="text-white text-xl font-bold">{{ data.title }}</p>
          <div class="pt-2">
            <el-icon v-for="item in 4" size="20" color="rgb(188,201,222)">
              <StarFilled />
            </el-icon>
            <el-icon size="20" color="rgb(51 65 85)">
              <StarFilled />
            </el-icon>
          </div>
          <el-divider border-style="double" />
          <p class=" text-slate-400 text-sm">
            BRAND :
            <span class="pl-12 text_color_data">
              Apple
            </span>
          </p>
          <p class="text-slate-400 text-sm py-1">
            TYPE :
            <span class="pl-16 text_color_data">
              {{ replaceStrIndexToUpperCase(data.category, 0) }}
            </span>
          </p>
          <p class="text-slate-400 text-sm">
            AVAILABILTY :
            <span class="pl-3 text-center text_color_data">
              In Stock
            </span>
          </p>
          <p class="pt-5 text-amber-500 text-bold text-2xl">
            $ {{ formatThousandth(data.price) }}
            <span class="line-through pl-2 text_color_data text-lg">
              {{ formatThousandth(data.price + global.DISCOUNTMONEY) }}
            </span>
          </p>
          <el-divider border-style="double" />
          <div class="flex">
            <el-input-number v-model="quantity" disabled />
            <el-button @click="typeof cartData[data.id] === 'object'
              ? store.delCartItem(data.id)
              : store.addToCart(data)" color="rgb(24,27,46)" class="ml-3">
              <el-icon :color="typeof cartData[data.id] === 'object' ? 'rgb(234 179 8)' : 'rgb(148 163 184)'" size="18"
                class="mr-1">
                <ShoppingCartFull v-if="typeof cartData[data.id] === 'object'" />
                <ShoppingCart v-else />
              </el-icon>
              <span :class="typeof cartData[data.id] === 'object' ? 'text-yellow-500' : 'text-slate-400'">
                Add to Cart
              </span>
            </el-button>
          </div>
          <el-divider border-style="double" />
          <div class="flex">
            <p class="text-slate-400 text-sm mr-5">SHARE THIS :</p>
            <el-icon class="mx-1 cursor-pointer" size="23" color="rgb(248 250 252)">
              <Share />
            </el-icon>
            <el-icon class="mx-1 cursor-pointer" size="23" color="rgb(248 250 252)">
              <Promotion />
            </el-icon>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="w_70">
      <el-tabs stretch v-model="tabsName" class="demo-tabs">
        <el-tab-pane label="CONTENT" name="content">
          <div class="w_100 flex justify-center items-center py-9">
            <div class="w_80">
              <p class="text-white text-lg">{{ data.content }}</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="INFORMATION" name="information">
          <div class="w_100 flex justify-center items-center py-9">
            <div class="w_80">
              <table class="w_100">
                <tbody class="w_100">
                  <tr v-for="item in informationData" class="w_100 text-center">
                    <td class="w_30 py-4 text-white border-solid border border-slate-600">
                      {{ item.title }}
                    </td>
                    <td class="w_70 border-solid border border-slate-600 text_color_data">
                      {{ item.description }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="SHIPPING DETAILS" name="shippingDetails">
          <div class="w_100 flex justify-center items-center py-9">
            <div class="w_80">
              <p class="text-white text-lg">
                What is a Shipping Policy
              </p>
              <p class="text-sm pt-5 text_color_data">
                Having a Shipping Policy is important for managing expectations of your customers because:
              </p>
              <ul class="pl-8 py-3 text_color_data">
                <li class="list-disc">It lets them know how much they can expect to pay for shipping</li>
                <li class="list-disc">And how long of a wait they can expect when it comes to receiving their goods</li>
              </ul>
              <p class="text-sm text_color_data">
                It also makes them aware of different options that are available.
              </p>
              <p class="text-sm text_color_data pt-3"> If it takes too long for a customer to figure out how much you
                charge for shipping and generally how
                long an item will take to arrive, the customer will probably buy elsewhere and you'll be losing business.
              </p>
            </div>
          </div>
        </el-tab-pane>
        <RelatedProduct :category="data.category" />
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { apiGetProduct } from '@/api';
import { onMounted, ref, Ref, inject } from 'vue';
import { replaceStrIndexToUpperCase, formatThousandth } from '@/common/common';
import { globalKey, globalData } from '@/global';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { ShoppingCart } from '@element-plus/icons-vue'
import RelatedProduct from './RelatedProduct.vue';
import { ElNotification } from 'element-plus'

const route = useRoute();
const global = inject(globalKey, globalData);
const store = useCounterStore();
const { isMobile, cartData, isBigDesktop } = storeToRefs(store);

const data: Ref<any> = ref({})
const isReady: Ref<boolean> = ref(false);
const quantity: Ref<number> = ref(1);
const tabsName: Ref<string> = ref('content')

const informationData: Array<{ title: string; description: string }> = [
  {
    title: 'COLOR',
    description: 'Black, Blue, Gold'
  },
  {
    title: 'SIZE',
    description: 'XXL, XL, L, M'
  }
]

onMounted(async () => {
  await apiGetProduct({ title: route.params.productTitle })
    .then((response) => {
      [data.value] = response.data
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

</script>

<style lang="scss" scoped>
.img_product_page_banner {
  background-image: url('@/assets/productPageBanner.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.text_color_data {
  color: rgb(173, 173, 173);
}

:deep(.el-divider) {
  border-color: rgb(71 85 105);
}

:deep(.el-divider__text.is-left) {
  background-color: $first_theme_color;
  color: white;
}

:deep(.el-input-number) {

  .el-input.is-disabled .el-input__wrapper,
  .el-input-number__increase,
  .el-input-number__decrease {
    background-color: $first_theme_color;
  }
}

:deep(.el-tabs) {
  .el-tabs__active-bar {
    background-color: rgb(245 158 11);
  }

  .el-tabs__nav-wrap::after {
    background-color: rgb(71 85 105);
  }

  .el-tabs__item {
    color: rgb(124, 124, 124);
  }

  .el-tabs__item.is-active {
    color: rgb(255, 255, 255);
  }
}
</style>