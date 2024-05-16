<template>
  <div class="flex justify-center w_100 py-5">
    <div class="w_70">
      <div class="demo-image__preview flex justify-around">
        <el-image v-for="(item, index) in srcList" :key="item" :src="srcList[index]" :zoom-rate="1.2"
          :preview-src-list="srcList" :initial-index="index" fit="cover" hide-on-click-modal />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const srcList: Array<string> = [
  new URL('@/assets/wearingPhotoOne.jpg', import.meta.url).href,
  new URL('@/assets/wearingPhotoTwo.jpg', import.meta.url).href,
  new URL('@/assets/wearingPhotoThree.jpg', import.meta.url).href,
  new URL('@/assets/wearingPhotoFour.jpg', import.meta.url).href,
]

</script>