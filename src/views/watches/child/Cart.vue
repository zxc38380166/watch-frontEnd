<template>
  <el-dialog id="dialog" v-model="store.showCart" @open="openDialog" center align-center draggable
    :width="`${dialogSize}%`">
    <template #header>
      <div class="flex justify-between items-center w_104">
        <p class="text-white text-xl font-bold pl-1">CART</p>
      </div>
    </template>
    <div class="box-card bg_first_theme_color w_100">
      <el-empty v-if="cartDataIsEmpty" description="Cart is empty" />
      <div v-else class="h-96 p-0 m-0 overflow-auto">
        <div v-for="(item, key) in cartData" :key="item.id" class="flex pt-3 items-center">
          <el-image class="h-24 w-24" :src="item.imageUrl" fit="fill" />
          <div class="pl-3 flex justify-between w-full">
            <div>
              <p class="text-slate-400">
                {{ item.category }}
              </p>
              <p class="text-slate-200">
                {{ item.title }}
              </p>
              <p class="text-amber-500 text-bold text-lg">
                {{ formatThousandth(item.price) }}
              </p>
            </div>
            <div @click="store.delCartItem(key)" class="cursor-pointer flex pr-7 flex-col justify-center items-center">
              <el-icon size="19" color="">
                <Delete />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="text-end pb-2">
        <p class="font-bold text-xl text-slate-200 pr-1">
          TOTAL :
          <span class="underline-offset-1 underline text-amber-500">{{ formatThousandth(calculateTotal) }}</span>
        </p>
      </div>
      <div class="flex justify-end items-center">
        <el-button type="danger" class="mr-2" @click="emptyCart">
          <el-icon class="mr-2" size="18">
            <Delete />
          </el-icon>
          EMPTY CART
        </el-button>
        <el-button type="warning" @click="checkout">
          <el-icon class="mr-2" size="18">
            <Money />
          </el-icon>
          CHECK OUT
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
  
<script lang="ts" setup>
import { nextTick, computed, ComputedRef } from 'vue'
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { formatThousandth } from '@/common/common';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';

const router = useRouter();
const store = useCounterStore();
const { isMobile, isBigDesktop, cartData } = storeToRefs(store);

const cartDataIsEmpty: ComputedRef<boolean> = computed(() => Object.keys(store.cartData).length === 0)
function checkout(): void {
  if (cartDataIsEmpty.value) {
    ElNotification({
      title: 'error',
      message: 'Cart is currently empty !',
      type: 'error',
      duration: 3000
    })
    return
  }
  router.push({ name: 'order' });
  store.switchShowCart()
}

const dialogSize: ComputedRef<number> = computed(() => {
  if (isMobile.value) {
    return 90
  }
  return isBigDesktop.value ? 30 : 50
})

const calculateTotal: ComputedRef<number> = computed(() =>
  Object.values(cartData.value).reduce((result: number, item: any) => {
    result += item.price;
    return result
  }, 0)
)

const dailogStyleData: { setStyleEnd: boolean, setDialogStyle: () => void } = {
  setStyleEnd: false,
  setDialogStyle() {
    nextTick(() => {
      const dialog = document.getElementById('dialog') as HTMLElement;
      dialog.style.backgroundColor = 'rgb(34,39,54)';
    })
  }
};

function openDialog(): void {
  if (!dailogStyleData.setStyleEnd) {
    dailogStyleData.setDialogStyle();
    dailogStyleData.setStyleEnd = true; // 只會設定一次彈窗樣式, 設定完後上鎖
  }
}

function emptyCart(): void {
  store.delCartItem()
}

</script>
  
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background-color: $second_theme_color;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 4px gray;
}
</style>