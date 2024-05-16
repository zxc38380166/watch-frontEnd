<template>
  <div class="bg_second_theme_color h-28 w-full flex justify-center items-center">
    <div v-if="isDesktop" class="flex justify-center items-center w_85">
      <div class="w-1/5 flex justify-center items-center">
        <img src="@/assets/logo.png" width="210" height="210" alt="logo">
      </div>
      <div class="w-3/5 flex justify-center items-center">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in breadcrumbData" :to="{ path: `/${item.name}` }">
            <p class=" cursor-pointer" :class=" item.name === route.name ? 'text-amber-500' : 'text-slate-400'">
              {{ item.name.toUpperCase() }}
            </p>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="w-1/5 flex justify-center items-center">
        <el-icon v-if="false" class="mx-2 cursor-pointer" color="rgb(96, 98, 102)" size="30px">
          <User />
        </el-icon>
        <el-badge :value="cartIdData.length" class="item" type="warning">
          <el-icon @click="store.switchShowCart" class="mx-2 cursor-pointer" color="rgb(96, 98, 102)" size="30px">
            <ShoppingCart />
          </el-icon>
        </el-badge>
      </div>
    </div>
    <div v-else class="flex justify-center items-center w_85">
      <div class="w-1/3 flex justify-center items-center">
        <Drawer :data="breadcrumbData" />
      </div>
      <div class="w-1/3 flex justify-center items-center">
        <img src="@/assets/logo.png" width="210" height="210" alt="">
      </div>
      <div class="w-1/3 flex justify-center items-center">
        <el-icon v-if="false" class="mx-2 cursor-pointer" color="rgb(96, 98, 102)" size="30px">
          <User />
        </el-icon>
        <el-badge :value="cartIdData.length" class="item" type="warning">
          <el-icon @click="store.switchShowCart" class="mx-2 cursor-pointer" color="rgb(96, 98, 102)" size="30px">
            <ShoppingCart />
          </el-icon>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import Drawer from "./Drawer.vue";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const route = useRoute();
const store = useCounterStore();
const { isDesktop, cartIdData } = storeToRefs(store);

const breadcrumbData: Array<{ name: string }> = reactive([
  {
    name: 'home'
  },
  {
    name: 'about'
  },
  {
    name: 'watches'
  },
  {
    name: 'faq'
  },
  {
    name: 'contact'
  }
]);

</script>