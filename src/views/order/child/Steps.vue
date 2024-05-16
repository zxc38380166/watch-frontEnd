<template>
  <el-steps class="pt-9 pb-7" :active="active" align-center finish-status="success">
    <el-step title="CART" />
    <el-step title="ORDER" />
    <el-step title="CHECKOUT" />
  </el-steps>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const stepsStatus: {
  [index: string]: number
} = {
  ['details']: 1,
  ['checkout']: 2,
  ['completedOrder']: 3
}
const active: ComputedRef = computed(() => stepsStatus[route.name as string] || 1)

</script>

<style lang="scss" scoped>
:deep(.el-step) {
  .el-step__icon-inner {
    color: black;
  }

  .el-step__icon {
    background-color: rgb(203, 148, 0);
  }

  .el-step__head {
    border-color: rgb(203, 148, 0);
  }

  .el-step__icon {
    background-color: rgb(203, 148, 0);
  }

  .el-step__title {
    color: rgb(148 163 184);
  }

  .el-step__line {
    background-color: rgb(89, 93, 104);
  }
}
</style>