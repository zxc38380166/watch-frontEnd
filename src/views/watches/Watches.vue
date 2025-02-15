<template>
  <div class="w-full flex justify-center items-center py-5 flex-col">
    <div class="w_70 img_watches_banner h-80 flex justify-center items-center">
      <p class="text-center text-white font-bold text-3xl">WATCHES</p>
    </div>
    <div class="flex w_70 pt-4" :class="{ 'flex-col': isMobile }">
      <div :class="[`w_${sideBarSize}`, { 'pr-1': isDesktop }]" class=" w-full flex flex-col">
        <div class="top-4 left-0 sticky w-full border-solid border border-slate-600 p-4">
          <ul>
            <p class="text-slate-200 font-bold text-center">
              {{ sideBarData.title }}
              <el-divider border-style="double" class="side_bar_title_divider" />
            </p>
            <li v-for="item in sideBarData.colData" @click="toggleFilterMode(item.content)" :key="item.content"
              :id="item.content" :class="filterMode === item.content ? 'text-slate-200' : 'text-slate-400'"
              class="border-solid border-b border-slate-600 h-8 text-center mb-2.5">
              <p class="cursor-pointer">
                {{ replaceStrIndexToUpperCase(item.content, 0) }}
                {{ item.content === 'all' ? 'Watches' : 'series' }}
                ( <span>{{ isReady ? item.quantity : 0 }}</span> )
              </p>
            </li>
          </ul>
          <img v-if="isDesktop" src="@/assets/watchesSidebarImg.jpg" height="400" alt="廣告圖">
        </div>
      </div>
      <div :class="[`w_${menuSize.containerWidth}`, { 'pl-1': isDesktop, 'mt-4': isMobile }]" class="flex flex-col">
        <div class="menu_header w-full h-12 flex items-center"
          :class="{ 't-3 justify-center': isMobile, 'pl-5': isDesktop }">
          <p class="text-slate-400">SHOWING ALL
            <span class="text-slate-200">
              {{ isReady ? sortData[filterMode].length : 0 }}
            </span> RESULTS
          </p>
        </div>
        <div class="flex justify-center items-center">
          <el-row class="w-full py-1">
            <el-col v-for="item in sortData[filterMode]" :span="menuSize.column" class="py-6 menu_col"
              :class="{ 'menu_col_mobile': isMobile }">
              <div v-if="isReady" class="flex-col flex justify-center items-center">
                <RouterLink :to="{ path: `/productPage/${item.title}` }" class="flex justify-center items-center">
                  <img :src="item.imageUrl" alt="Product" :class="isMobile ? 'w_50' : 'w_90'">
                </RouterLink>
                <p class="text-slate-400 pt-2">
                  {{ replaceStrIndexToUpperCase(item.category, 0) }}
                </p>
                <p class="text-xl text-bold text-slate-200">{{ item.title }}</p>
                <p class="text-amber-500 text-bold pt-1 text-xl">
                  ${{ formatThousandth(item.price) }}
                </p>
                <div class="pt-2">
                  <RouterLink :to="{ path: `/productPage/${item.title}` }">
                    <el-button color="rgb(24,27,46)">
                      <el-icon class="mr-1" size="20" color="rgb(148 163 184)">
                        <Money />
                      </el-icon>
                      <span class="text-slate-400">View Product</span>
                    </el-button>
                  </RouterLink>
                  <br>
                  <el-button @click="typeof cartData[item.id] === 'object'
                    ? store.delCartItem(item.id)
                    : store.addToCart(item)" color="rgb(24,27,46)" class="mt-1">
                    <el-icon :color="typeof cartData[item.id] === 'object' ? 'rgb(234 179 8)' : 'rgb(148 163 184)'"
                      size="18" class="mr-1">
                      <ShoppingCartFull v-if="typeof cartData[item.id] === 'object'" />
                      <ShoppingCart v-else />
                    </el-icon>
                    <span class="mr-3.5"
                      :class="typeof cartData[item.id] === 'object' ? 'text-yellow-500' : 'text-slate-400'">
                      Add to Cart
                    </span>
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ComputedRef, onMounted, ref, Ref, inject } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { apiGetProduct, retryApi } from '@/api';
import { globalKey, globalData } from '@/global';
import { replaceStrIndexToUpperCase, formatThousandth } from '@/common/common';
import { ElNotification } from 'element-plus';

const global = inject(globalKey, globalData);
const store = useCounterStore();
const { isMobile, isDesktop, isSmallDesktop, cartData } = storeToRefs(store);

const sortData: Ref = ref({});
const isReady: Ref<boolean> = ref(false);

onMounted(async () => {
  getProducts()
  // 閉包範例
  // function aFunc(x: any){
  //   return () => console.log( x++ )
  // }
  // const newFunc = aFunc(1) // 此時宣告x等於1已存入newFunc記憶體, 後續除非銷毀 newFunc 否則每次呼叫x 都會是原賦值
  // newFunc()
  // newFunc()

  // 執行順序為 3.4.5.6.7
  // setTimeout(() => {
  //   console.log(7)
  // }, 0)
  // new Promise((resolve, reject) => {
  //   console.log(3)
  //   resolve()
  //   console.log(4)
  // }).then(() => {
  //   console.log(6)
  // })
  // console.log(5)

  // const obj = {
  //   thisFu: function() { // 一搬函數 this 取決於它得外層
  //     console.log(this, 'this')
  //   },
  //   thisArrowFu: () => { // 箭頭函數沒有自己的 this 取決於在哪個作用域呼叫
  //     console.log(this, 'this')
  //   }
  // }
  // obj.thisFu()
  // obj.thisArrowFu()

  // const v2Data = {
  //   message: 'Hello, Vue 2!'
  // }

  // // 使用Object.defineProperty()定义响应式属性
  // Object.defineProperty(v2Data, 'message', {
  //   get() {
  //     console.log('Get message')
  //     return v2Data._message
  //   },
  //   set(value) {
  //     console.log('Set message')
  //     v2Data._message = value
  //   }
  // })

  // console.log(v2Data.message) // 输出：Get message  Hello, Vue 2!
  // v2Data.message = 'Updated Message' // 输出：Set message
  // console.log(v2Data.message) // 输出：Get message  Updated Message


  // 使用Proxy对象创建响应式代理

  const data = {
    message: "Hello, Vue 3!"
  };

  // const reactiveData = new Proxy(data, {
  //   get(target, key) {
  //     console.log('Get', key);
  //     return target[key];
  //   },
  //   set(target, key, value) {
  //     console.log('Set', key);
  //     target[key] = value;
  //   }
  // });

  // console.log(reactiveData.message); // 输出：Get message  Hello, Vue 3!
  // reactiveData.message = "Updated Message"; // 输出：Set message
  // console.log(reactiveData.message); // 输出：Get message  Updated Message

})




const filterMode: Ref<string> = ref('all')
function toggleFilterMode(mode: string): void {
  filterMode.value = mode;
}

// 需求 篩選出各系列商品且計算各系列有多少筆資料
// 限制 1. 只能呼叫一次 api, api回傳格式為陣列包住多筆資料 Ex: [{}, {}, {}]
// 結果 
// { 
//   all: [],
//   casual: [],
//   stylish: [],
//   classic: [],
//   luxury: [] 
// }

async function getProducts(): Promise<void> {
  await retryApi(apiGetProduct, '').then((response: any) => {
    console.log(response, 'response');
    
    filterData(response.data)
  }).catch(() => {
    ElNotification({
      title: 'Failed to load',
      message: 'Error occurs when loading, please refresh it later !',
      type: 'error',
      duration: 0
    })
  })
}

type Data = {
  name: string;
  price: number;
}
const data: Array<Data> = [
  {
    name: '石斑',
    price: 300,
  },
  {
    name: '烏魚',
    price: 100,
  },
  {
    name: '鱈魚',
    price: 1000,
  },
  {
    name: '章魚',
    price: 20,
  },
  {
    name: '花枝',
    price: 60,
  }
]

console.log('結果：', data.some((item) => item.name === '鱈魚'))

let result = true
data.forEach((item) => {
  if (item.price > 2000) {
    result = false
  }
})
console.log('所有階小於2000', result);

const resultNameData = data.reduce((value: string[], item: { name: string; price: number }) => {
  if (item.price < 70) value.push(item.name)
  return value
}, [])
console.log(resultNameData, 'resultNameData');

const noFirshData = data.filter((item) => !item.name.includes('魚'))
console.log(noFirshData, 'noFirshData');

const priceResult = data.reduce((value, item) => {
  if (item.price > 90) {
    value += item.price
  }
  return value
}, 0)
console.log(priceResult, 'priceResult');



// CASE 1
// 時間複雜度：先針對類別跑一次迴圈再針對各類別跑數據迴圈，時間複雜度為 O(n*m)，n 是數據長度，m 是類別數。對於大型數據，效能較低。
// function filterData<T>(data: Array<T>): void {
//   sortData.value['all'] = data;
//   ['casual', 'stylish', 'classic', 'luxury'].forEach((type: string) => {
//     sortData.value[type] = data.filter((item: any) => item.category === type)
//   })
//   isReady.value = true;
// }

// // CASE 2
// // 時間複雜度：建立基本格式後只跑一次數據迴圈，時間複雜度為 O(n)，相較篩選一對於大型數據更高效能。
// function filterData<T>(data: Array<T>): void {
//   const results = {
//     all: data,
//     ['casual']: [],
//     ['stylish']: [],
//     ['classic']: [],
//     ['luxury']: []
//   }
//   data.forEach((item) => {
//     switch (item.category) {
//       case 'casual': results['casual'].push(item)
//         break;
//       case 'stylish': results['stylish'].push(item)
//         break;
//       case 'classic': results['classic'].push(item)
//         break;
//       case 'luxury': results['luxury'].push(item)
//         break;
//       default:
//         break;
//     }
//   })
//   sortData.value = results
//   isReady.value = true;
// }

// CASE 3
// 時間複雜度：相較篩選二一樣只跑一次數據迴圈，時間複雜度為 O(n)，但使用 Promise，能夠並行處理異步操作及篩選，對於大型數據效能最大化。
function filterData<T>(data: Array<T>) {
  sortData.value['all'] = data
  Promise.all([
    handleFilterPromise('casual'),
    handleFilterPromise('stylish'),
    handleFilterPromise('classic'),
    handleFilterPromise('luxury')
  ])
    .then(() => {
      isReady.value = true;
    })
    .catch(() => {
      isReady.value = false;
    })
}

function handleFilterPromise<T>(type: string): Promise<T> {
  return new Promise((resolve) => {
    sortData.value[type] = sortData.value.all
      .filter((item: { category: string }) => item.category === type);
    resolve(sortData.value[type]);
  })
}

const sideBarData: {
  title: string;
  colData: Array<{
    content: string;
    quantity: ComputedRef<number>
  }>
} = reactive({
  title: 'CATEGORY',
  colData: [
    {
      content: 'all',
      quantity: computed(() => sortData.value['all'].length)
    },
    {
      content: 'casual',
      quantity: computed(() => sortData.value['casual'].length)
    },
    {
      content: 'stylish',
      quantity: computed(() => sortData.value['stylish'].length)
    },
    {
      content: 'classic',
      quantity: computed(() => sortData.value['classic'].length)
    },
    {
      content: 'luxury',
      quantity: computed(() => sortData.value['luxury'].length)
    }
  ]
})

const sideBarSize: ComputedRef<number> = computed(() => {
  if (isMobile.value) {
    return global?.PERCENTAGE
  }
  const smallWidth = 40;
  const bigWidth = 20;
  return isSmallDesktop.value ? smallWidth : bigWidth
});

const menuSize: ComputedRef<{
  containerWidth: number;
  column: number;
  class: string;
}> = computed(() => {
  const mobileCol: number = 24;
  const isSmallDesktopCol: number = 12;
  const notSmallDesktopCol: number = 6;
  function handleColumn(): number {
    if (isMobile.value) {
      return mobileCol
    }
    return isSmallDesktop.value ? isSmallDesktopCol : notSmallDesktopCol;
  }
  function handleClass(): string {
    if (isMobile.value) {
      return 'menu_col_mobile'
    }
    return isSmallDesktop.value ? 'menu_col_small_desktop' : 'menu_col_big_desktop';
  }

  return {
    containerWidth: isMobile.value ? global?.PERCENTAGE : global?.PERCENTAGE - sideBarSize.value,
    column: handleColumn(),
    class: handleClass()
  }
})

</script>

<style lang="scss" scoped>
@keyframes menu_col_animation {
  100% {
    box-shadow: 0 0 30px $second_theme_color;
  }
}

.menu_col:hover {
  animation-name: menu_col_animation;
  animation-duration: .5s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
}

.img_watches_banner {
  background-image: url('@/assets/watchesBanner.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

:deep(.side_bar_title_divider) {
  border-color: rgb(245 158 11);
}

.menu_header {
  background-color: rgb(44, 50, 70)
}

:deep(.menu_col_mobile) {
  box-shadow: 0 0 30px $second_theme_color;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>