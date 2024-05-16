<template>
  <div class="w-full flex justify-center items-center py-6 flex-col">
    <div class="w_70 flex justify-center h-80 items-center img_contact_banner">
      <p class="text-center text-white font-bold text-3xl">CONTACT</p>
    </div>
    <div class="w_70 flex justify-center items-center pt-5" :class="{ 'flex-col': isMobile }">
      <div class="flex-col flex justify-center items-center" :class="isMobile ? 'w-3/3' : 'w-1/3'">
        <el-icon size="40px" color="rgb(203,213,225)">
          <PhoneFilled />
        </el-icon>
        <p class="text-slate-300 font-bold py-3">TALK TO US</p>
        <p class="text-slate-400">Phone: 0800-123-456</p>
        <p class="text-slate-400">Fax: 0800-654-321</p>
      </div>
      <div class="flex-col flex justify-center items-center"
        :class="[isMobile ? 'w-3/3' : 'w-1/3', { 'py-5': isMobile }]">
        <el-icon size="40px" color="rgb(203,213,225)">
          <Flag />
        </el-icon>
        <p class="text-slate-300 font-bold py-3">LOCATION</p>
        <p class="text-center text-slate-400">Dehua St., North Dist. <br> Taichung</p>
      </div>
      <div class="flex-col flex justify-center items-center" :class="isMobile ? 'w-3/3' : 'w-1/3'">
        <el-icon size="40px" color="rgb(203,213,225)">
          <Comment />
        </el-icon>
        <p class="text-slate-300 font-bold py-3">CONTACT US</p>
        <p class="text-slate-400">zxc38380166@yahoo.com.tw</p>
        <p class="text-slate-400">zxc38380166@gmail.com</p>
      </div>
    </div>
    <el-divider class="w_70" border-style="double" />
    <div class="flex justify-center items-center flex-col" :class="isDesktop ? 'w_70' : 'w_80'">
      <p class="text-slate-300 font-bold text-2xl">CONTACT INFORMATION</p>
      <el-divider class="w_20 contact_information_divider" border-style="double" />
      <div class="contact_form w_70">
        <el-form ref="formRef" :rules="rules" :model="form" class="demo-ruleForm">
          <el-row>
            <el-col :span="isDesktop ? 12 : 24" :class="{ 'pr-2': isDesktop }" class="input_container">
              <el-form-item prop="name">
                <el-input v-model="form.name" :placeholder="`Please input name`" type="text" autocomplete="off" />
              </el-form-item>
              <el-form-item prop="email">
                <el-input v-model="form.email" :placeholder="`Please input email`" type="text" autocomplete="off" />
              </el-form-item>
              <el-form-item prop="phone">
                <el-input v-model.number="form.phone" :placeholder="`Please input phone`" type="text"
                  autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="isDesktop ? 12 : 24" :class="{ 'pl-2': isDesktop }">
              <el-form-item prop="message">
                <el-input v-model.number="form.message" :placeholder="`Please input message`" type="textarea" :rows="6"
                  autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-button @click="submitForm(formRef)" class="btn_send bg_second_theme_color mt-6"
        :class="isMobile ? 'w_100' : 'w_47'" plain>
        <p>
          SEND YOUR MESSAGE
        </p>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'

const store = useCounterStore();
const { isDesktop, isMobile } = storeToRefs(store);

const formRef = ref<FormInstance>()
interface Form {
  [index: string]: string;
  email: string;
  phone: string;
  message: string;
  name: string
}
const form: Form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
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

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: 'Please input name',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: 'Please input phone',
      trigger: 'blur',
    },
    {
      validator: validatePhone,
      trigger: 'blur'
    }
  ],
  message: [
    {
      required: true,
      message: 'Please input message',
      trigger: 'blur'
    }
  ],
})

function submitForm(formEl: FormInstance | undefined): void {
  if (!formEl) {
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      ElNotification({
        title: 'success !',
        message: 'Form sent successfully !',
        type: 'success',
        duration: 3000
      })
      resetForm(formEl);
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

function resetForm(formEl: FormInstance | undefined): void {
  if (!formEl) {
    return
  }
  formEl.resetFields()
}

</script>

<style lang="scss" scoped>
.btn_send {
  border: none;
}

.img_contact_banner {
  background-image: url('@/assets/contactBanner.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

:deep(.el-divider) {
  border-color: rgb(71 85 105);
}

:deep(.contact_information_divider) {
  border-color: rgb(245 158 11);
}

:deep(.contact_form) {
  $text_color: rgb(203 213 225);
  $bg_color: rgb(44, 50, 70);

  .el-input__inner::placeholder,
  .el-textarea__inner::placeholder {
    color: rgb(100 116 139);
  }

  .el-input__wrapper {
    background-color: $bg_color;
    box-shadow: none;
    color: rgb(148 163 184);
  }

  .el-textarea__inner {
    background-color: $bg_color;
    box-shadow: none;
    color: $text_color;
  }

  .el-input__inner {
    color: $text_color;
  }
}

.input_container {
  padding-top: 0.5px;
}
</style>