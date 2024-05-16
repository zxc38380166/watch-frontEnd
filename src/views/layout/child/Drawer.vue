<template>
  <button @click="showDrawer = true">
    <el-icon size="30px" color="rgb(156 163 175)">
      <Menu />
    </el-icon>
  </button>
  <el-drawer v-model="showDrawer" :show-close="false" class="bg_first_theme_color" direction="rtl" size="80%">
    <template #header="{ close }">
      <div class="flex justify-end items-center">
        <button class="pr-6" @click="close">
          <el-icon size="25px">
            <CloseBold />
          </el-icon>
        </button>
      </div>
    </template>
    <div v-for="item in props.data" @click="togglePage(item.name)" class="flex justify-center items-center flex-col">
      <p class="pt-5 text-lg font-bold text-white">{{ item.name.toUpperCase() }}</p> <br>
      <el-divider border-style="dotted" class="menu_item_divider" />
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  data: {
    type: Object,
    default: () => []
  }
})
const router = useRouter();

const showDrawer: Ref<boolean> = ref(false);

function togglePage(routerName: string): void {
  router.push({ name: routerName })
  showDrawer.value = false;
}

</script>

<style lang="scss" scoped>
:deep(.menu_item_divider) {
  margin: 0;
}
</style>
