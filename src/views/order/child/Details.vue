<template>
  <div class="w-full form mt-3 flex justify-start flex-col">
    <el-row>
      <el-col :span="24" class="pb-4">
        <div class="w_100 h_70  flex justify-center">
          <div class="w_92">
            <p class="font-bold text-xl mt-5 text-slate-400">
              Billing Details
              <el-divider border-style="double" class="w_40" />
            </p>
            <el-form :label-position="'top'" :model="form" :rules="formRules" ref="formRef" label-width="120px"
              class="demo-form" :size="'small'" status-icon>
              <el-form-item v-for="(item, key) in form" :key="key" :label="key.toUpperCase()" :prop="key">
                <!-- // 備註欄 -->
                <el-input v-if="key === 'orderNotes'" v-model="form[key]" :rows="4" type="textarea"
                  :placeholder="`Please input ${key}`" />
                <!-- 優惠碼欄 -->
                <el-input v-else-if="key === 'couponCode'" :disabled="couponConfirmation" v-model="form[key]"
                  :placeholder="`Please input ${key}`">
                  <template #append>
                    <el-button :disabled="couponConfirmation"
                      @click="couponConfirmation = form[key] === global.COUPONCODE" size="small">
                      <el-icon v-if="couponConfirmation" color="rgb(245 158 11)">
                        <SuccessFilled />
                      </el-icon>
                      <span v-else>SEND</span>
                    </el-button>
                  </template>
                </el-input>
                <!-- 一般輸入欄 -->
                <el-input v-else v-model="form[key]" :placeholder="`Please input ${key}`" />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="24" class="bg_order_details">
        <div class="w_100 h_70  flex justify-center">
          <div class="w_92">
            <p class="font-bold text-xl mt-5 text-slate-400">
              YOUR ORDER
              <el-divider border-style="double" class="w_40" />
            </p>
            <el-table :data="handlOrderData()" :header-row-style="tableStyleData.headerRowStyle"
              :header-cell-style="tableStyleData.headerCellStyle" :row-style="tableStyleData.rowStyle"
              :cell-style="tableStyleData.cellStyle">
              <el-table-column prop="title" label="ITEM" />
              <el-table-column prop="price" label="PRICE" />
            </el-table>
            <el-table :data="details" :header-row-style="tableStyleData.headerRowStyle"
              :header-cell-style="tableStyleData.headerCellStyle" :row-style="tableStyleData.rowStyle"
              :cell-style="tableStyleData.cellStyle">
              <el-table-column prop="title"> </el-table-column>
              <el-table-column prop="content">
                <template #default="scope">
                  <div v-if="scope.row.title === 'SHIPPING'">
                    <el-radio-group v-model="shippingRadio">
                      <el-radio label="freeShipping" size="large">Free Shipping</el-radio>
                      <el-radio label="flatRate" size="large">Flat Rate : 100 $</el-radio>
                    </el-radio-group>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-button @click="checkout(formRef)" class="btn_chenckout mt-5 mb-7">
              CHECKOUT
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, CSSProperties, inject, Ref } from 'vue'
import type { FormRules, ColumnStyle, FormInstance } from 'element-plus'
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { formatThousandth, calculutePercentage } from '@/common/common';
import { globalKey, globalData } from '@/global';
import { apiSendOrder } from '@/api'
import { ElNotification, FormItemRule } from 'element-plus';
import { useRouter } from 'vue-router';
import { Arrayable } from 'element-plus/es/utils';

const router = useRouter();
const global = inject(globalKey, globalData);
const store = useCounterStore();
const { cartData } = storeToRefs(store);

const shippingRadio: Ref<string> = ref('freeShipping')
const couponConfirmation: Ref<boolean> = ref(false);

const details: Array<{
  title: string;
  content?: string | undefined;
}> = reactive([
  {
    title: 'SUBTOTAL',
    content: ''
  },
  {
    title: 'SHIPPING'
  },
  {
    title: 'TOTAL',
    content: ''
  }
])

function handlOrderData(): object[] {
  const cloneCartData: Array<object> = Object.values(JSON.parse(JSON.stringify(cartData.value)));
  handleDetailsData(cloneCartData)
  return cloneCartData
}

const subTotalIndex: number = 0;
const totalIndex: number = 2;
function handleDetailsData(cloneCartData: Array<object>): void {
  const detailsData: { subTotal: number; total: number } = cloneCartData.reduce((data: any, item: any) => {
    data.subTotal += item.price
    data.total = couponConfirmation.value ? calculutePercentage(data.subTotal, 95) : data.subTotal
    if (shippingRadio.value === 'flatRate') {
      const freightCharges = 100;
      data.total += freightCharges
    }
    item.price = formatThousandth(item.price)
    return data;
  }, { subTotal: 0, total: 0 })

  details[subTotalIndex].content = formatThousandth(detailsData.subTotal);
  details[totalIndex].content = formatThousandth(detailsData.total);
}

function checkout(formDom: FormInstance | undefined): void {
  if (!formDom) {
    return
  }
  formDom.validate((valid) => {
    if (valid) {
      const params: {
        form: Form;
        products: any;
        total: string | undefined;
        subTotal: string | undefined;
      } = {
        form: form,
        products: cartData.value,
        total: details[totalIndex].content,
        subTotal: details[subTotalIndex].content
      }
      apiSendOrder(params).then((res) => {
        router.push({ path: `/order/checkout/${res.data.orderNumber}` })
      })
    } else {
      ElNotification({
        title: 'Failed !',
        message: 'Please fill in the form after filling in the form. !',
        type: 'error',
        duration: 3000
      })
      return false
    }
  })
}

interface Form {
    email: string;
    name: string;
    phone: string;
    address: string;
    couponCode: string;
    orderNotes: string;
}
const formRef = ref<FormInstance>()
const form: Form = reactive({
  email: '',
  name: '',
  phone: '',
  address: '',
  couponCode: '',
  orderNotes: ''
})

function validatePhone(rule: any, value: any, callback: any): void {
  if (value.toString().length < 8 || value.toString().length > 11) {
    callback(new Error('Length should be 8 to 11'))
  } else {
    if (isNaN(Number(value))) {
      callback(new Error('Please enter the correct phone format'))
    } else {
      callback()
    }
  }
}

const formRules: Partial<Record<string, Arrayable<FormItemRule>>> = reactive<FormRules>({
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change'],
    },
  ],
  name: [
    {
      required: true,
      message: 'Please input name',
      trigger: ['blur', 'change']
    }
  ],
  phone: [
    {
      required: true,
      message: 'Please input phone',
      trigger: ['blur', 'change']
    },
    {
      validator: validatePhone,
      trigger: 'blur'
    }
  ],
  address: [
    {
      required: true,
      message: 'Please input address',
      trigger: ['blur', 'change']
    }
  ],
  orderNotes: []
})

const tableStyleData: {
  headerRowStyle: ColumnStyle<CSSProperties>;
  headerCellStyle: ColumnStyle<CSSProperties>;
  rowStyle: ColumnStyle<CSSProperties>;
  cellStyle: ColumnStyle<CSSProperties>;
} = {
  headerRowStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgb(203 213 225)',
  },
  headerCellStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgb(43,48,66)',
  },
  rowStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgb(203 213 225)',
    fontWeight: 'bolder'
  },
  cellStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: 'none'
  }
}

</script>

<style lang="scss" scoped>
.bg_order_details {
  background-color: rgb(24, 27, 39);
}

.form {
  background-color: rgb(30, 34, 48);
}

:deep(.el-form) {

  .el-input__inner::placeholder,
  .el-textarea__inner::placeholder {
    color: rgb(71 85 105);
  }

  .el-input__wrapper {
    background-color: rgb(41, 45, 59);
    box-shadow: none;
  }

  .is-disabled .el-input__wrapper {
    background-color: rgb(41, 45, 59);
    box-shadow: none;
  }

  .el-input__inner {
    color: rgb(100 116 139);
  }

  .el-textarea__inner {
    background-color: rgb(41, 45, 59);
    box-shadow: none;
    color: rgb(100 116 139);
  }

  .el-input-group__append {
    background-color: rgb(41, 45, 59);
    border-left: 1px solid white;
    border-radius: 5px;
  }

  .el-form-item__label {
    color: rgb(148 163 184);
    font-weight: bold;
  }
}

:deep(.el-table) {
  background-color: rgba(0, 0, 0, 0);

  .el-table__inner-wrapper::before {
    height: 0px;
  }
}

.btn_chenckout {
  color: rgb(148 163 184);
  background-color: rgb(41, 45, 59);
  box-shadow: none;
  border: none;
}
</style>