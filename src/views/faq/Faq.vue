<template>
  <div class="w_100 flex justify-center py-5 flex-col items-center">
    <div class="w_70 img_faq_banner h-80 flex justify-center items-center">
      <p class="text-center text-white font-bold text-3xl">FAQ</p>
    </div>
    <div v-for="item in faqData" class="w_70 py-5">
      <p class="text-amber-400 text-2xl font-bold">{{ item.title }}</p>
      <p class="text-slate-400 pt-5">{{ item.content }}</p>
      <div class="demo-collapse">
        <el-collapse v-model="activeNames" id="collapse">
          <el-collapse-item v-for="childItem in item.child" :name="childItem.title">
            <template #title>
              <el-icon class="header-icon mr-3">
                <info-filled />
              </el-icon>
              {{ childItem.title }}
            </template>
            <div>
              {{ childItem.content }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive, Ref } from 'vue'

const faqData = reactive([
  {
    title: 'Purchase problem',
    content: 'On Otis Store, we assure you the premium quality products from the premium brands in Switzerland. Every watch that you buy online here on our website has been designed by their manufacturers keeping in mind the comfort of the end consumer. Made out of tough and genuine quality material, every product score high on durability.',
    child: [
      {
        title: 'Why are your prices so low?',
        content: 'Otis Store delivers thousands of watches to customers every day in an absolutely efficient manner, enabling us under certain circumstances to offer special offers and exclusives.'
      },
      {
        title: 'Are batteries included in the watches?',
        content: 'Yes, brand new batteries are included in all watches. These are fitted at the factory by the manufacturer - your watch is ready to wear as soon as you receive it.'
      },
      {
        title: 'Do you sell secondhand watches?',
        content: 'No. We only sell 100% brand new goods.'
      },
      {
        title: 'Do your watches come with guarantees?',
        content: "Otis Store delivers thousands of watches to customers every day in an absolutely efficient manner, enabling us under certain circumstances to offer special offers and exclusives."
      },
    ]
  },
  {
    title: ' Our Returns Policies ',
    content: 'Otis Store operate a full 14 days refund policy, where if you change your mind on any purchase you can return it to us within 14 days for a full refund. All we ask is that the watch is returned to us unworn.',
    child: [
      {
        title: 'How do I return?',
        content: 'Enter your order number and email address in the fields above and click Start. Follow the instructions and select the items you want to return. You will get a confirmation email with the shipping guidelines once the return request is approved.'
      },
      {
        title: 'Are there any charges for return?',
        content: 'There are no restocking fees for returns. Original shipping charges are non-refundable. You are responsible for the charges of the return shipping.'
      },
      {
        title: 'How soon will I get my refund?',
        content: "'If you're not completely satisfied withoOurs brands at any time, we are happy to give you a full refund. Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will automatically be applied to the original method of payment, within 10 working days after Otis Store receives your return.'"
      },
      {
        title: 'Faulty items?',
        content: "If you experience a manufacturing fault with your item(s) within the first 30 days of ownership, you will be eligible to receive a replacement provided that you inform us within a 30 day period. If you experience a manufacturing fault with your item(s) and you return it outside of 30 days of ownership, we will require your item to be sent for a repair."
      },
    ]
  },
  {
    title: 'Shipping service',
    content: 'Otis Store operate a full 14 days refund policy, where if you change your mind on any purchase you can return it to us within 14 days for a full refund. All we ask is that the watch is returned to us unworn.',
    child: [
      {
        title: 'Do you ship to international locations?',
        content: 'Yes. Simply checkout as usual and select your country as normal. Delivery to EU locations is shown in the checkout. Delivery to non-EU locations is usually £5 extra, depending on the country. All delivery options are displayed in the checkout process.'
      },
      {
        title: 'What kind of packaging do you use to protect my watch in transit?',
        content: 'For maximum protection, we use our own custom-cut cardboard boxes which snugly fit the boxes of all watch brands which we sell, filled with air bags or polystyrene. Also, we appreciate that the purchase of a watch is often intended as a gift, therefore all of our packaging is completely unbranded with no mention of Watch Shop on it.'
      },
      {
        title: 'Can you deliver on a Sunday?',
        content: "Unfortunately, we are unable to deliver on Sundays at this time."
      },
      {
        title: 'How do you send the items?',
        content: "Items are shipped by Royal Mail and you also have the option in the checkout to use a courier if you prefer. Next day delivery is available on all orders. This method of delivery is fully insured. Certain items under £60 are sent by Royal Mail First Class Delivery by default, however you can always upgrade to Special Delivery in the checkout. 9am delivery is also available in the checkout process."
      },
    ]
  }
])
const firstChildIndex = 0;
const activeNames: Ref<string[]> = ref(faqData.map(item => item.child[firstChildIndex].title))

</script>

<style lang="scss" scoped>
$collapse_padding: 3%;

.img_faq_banner {
  background-image: url('@/assets/faqBanner.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

:deep(.el-collapse) {
  border: none;

  .el-collapse-item__header {
    height: auto;
    min-height: 50px;
    line-height: 30px;
    background-color: rgb(44, 50, 70);
    color: rgb(148 163 184);
    font-size: 20px;
    font-weight: bold;
    border: none;
    @include setPaddingY(5px, 5px);
    padding-left: $collapse_padding;
  }

  .el-collapse-item__wrap {
    border: none;
  }

  .is-active {
    @function getBorderData($top: '', $bottom: '', $left: '', $right: '') {
      @return 
      $top,
      $bottom,
      $left,
      $right;
    };
    @mixin setCollapseBorder($data) {
      @each $item in $data {
        border-#{$item}: 1px solid rgb(251 191 36);
      }
    }
    .el-collapse-item__header {
      @include setCollapseBorder(getBorderData('top', 'right', 'left'));
    }
    .el-collapse-item__wrap {
      @include setCollapseBorder(getBorderData('bottom', 'right', 'left'));
    }
  }

  .el-collapse-item {
    padding-top: 15px;
  }

  .el-collapse-item__content {
    background-color: rgb(44, 50, 70);
    color: rgb(148 163 184);
    @include setPaddingX($collapse_padding, $collapse_padding);
  }
}
</style>
  