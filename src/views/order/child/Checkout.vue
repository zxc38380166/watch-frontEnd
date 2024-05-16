<template>
  <div class="bg_order_details w_100 flex justify-center items-center">
    <div class="w_92">
      <el-table class="bg_order_details mt-9 mb-5" :data="Object.values((order.products || {}))"
        :header-row-style="tableStyleData.headerRowStyle" :header-cell-style="tableStyleData.headerCellStyle"
        :row-style="tableStyleData.rowStyle" :cell-style="tableStyleData.cellStyle">
        <el-table-column prop="date" label="PRODUCT" align="center">
          <template #default="scope">
            <el-image class="product_image" :src="scope.row.imageUrl" :fit="'cover'" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="NAME" align="center">
          <template #default="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="PRICE" align="center">
          <template #default="scope">
            <span class="text-amber-500 underline-offset-1 underline">
              {{ formatThousandth(scope.row.price) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="QTY" align="center">
          <template #default="scope">
            1
          </template>
        </el-table-column>
      </el-table>
      <table class="w_100">
        <tbody>
          <tr v-for="(item, key) in { ...order.form, total: order.total }" class="details_item text-slate-300">
            <td class="w_50 break-all py-6">
              {{ replaceStrIndexToUpperCase(key as any, 0) }}
            </td>
            <td class="w_50 break-all py-6">
              {{ item || 'none' }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center items-center pt-8 pb-9" :class="{ 'flex-col': isMobile }">
        <el-button @click="router.push({ name: 'details' })" class="btn_chenckout">
          CANCEL ORDER
        </el-button>
        <el-button @click="completedOrder" :class="{ 'mt-2': isMobile }" type="warning">
          PROCEED TO CHECKOUT
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter, Router, RouteLocationNormalizedLoaded } from 'vue-router';
import { apiGetOrder } from '@/api';
import { reactive, ref, CSSProperties, computed, onMounted, Ref } from 'vue'
import type { ColumnStyle } from 'element-plus'
import { formatThousandth, replaceStrIndexToUpperCase } from '@/common/common';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const route: RouteLocationNormalizedLoaded = useRoute();
const router: Router = useRouter();
const order: Ref = ref({});
const store = useCounterStore();
const { isMobile } = storeToRefs(store);

onMounted(() => {
  apiGetOrder(route.params.id).then((res) => {
    order.value = res.data
  })
})

function completedOrder(): void {
  router.push({ name: 'completedOrder', params: { id: route.params.id } })
  store.delCartItem();
}

const tableStyleData: {
  headerRowStyle: ColumnStyle<CSSProperties>;
  headerCellStyle: ColumnStyle<CSSProperties>;
  rowStyle: ColumnStyle<CSSProperties>;
  cellStyle: ColumnStyle<CSSProperties>;
} = reactive({
  headerRowStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgb(203 213 225)',
    paddingBottom: '20px'
  },
  headerCellStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgb(43,48,66)',
  },
  rowStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgb(203 213 225)',
    fontWeight: 'bolder',
  },
  cellStyle: {
    paddingTop: '14px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgb(71 85 105)',
    fontSize: computed(() => isMobile.value ? '10px' : '16px')
  }
})

</script>

<style lang="scss" scoped>
.bg_order_details {
  background-color: rgb(24, 27, 39);
}

:deep(.el-table__inner-wrapper::before) {
  height: 0px;
}

:deep(.el-divider) {
  border-color: rgb(60, 67, 91);
}

.product_image {
  max-height: 128px;
  max-width: 128px;
}

.btn_chenckout {
  color: rgb(148 163 184);
  background-color: rgb(41, 45, 59);
  box-shadow: none;
  border: none;
}

.details_item {
  border-bottom: 1.5px dashed rgb(60, 67, 91);
}
</style>