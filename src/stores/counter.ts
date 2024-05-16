import { defineStore } from "pinia";
import { ref, computed, Ref, ComputedRef } from "vue";
import { useElementSize } from "@vueuse/core";
import { ElNotification } from "element-plus";

export const useCounterStore = defineStore(
  "counter",
  () => {
    // state
    const appDom: Ref<any> = ref(document.getElementById("app"));
    const deviceSize: Ref<any> = ref(useElementSize(appDom));
    const myFavourite: Ref<Array<string>> = ref([]);
    const showCart: Ref<boolean> = ref(false);
    const cartData: Ref<any> = ref({});

    // getter
    const isMobile: ComputedRef<boolean> = computed(
      () => deviceSize.value.width < 768
    );
    const isDesktop: ComputedRef<boolean> = computed(
      () => deviceSize.value.width >= 768
    );
    const isSmallDesktop: ComputedRef<boolean> = computed(
      () => deviceSize.value.width >= 768 && deviceSize.value.width <= 1280
    );
    const isBigDesktop: ComputedRef<boolean> = computed(
      () => deviceSize.value.width >= 1280
    );
    const cartIdData: ComputedRef<string[]> = computed(() =>
      Object.keys(cartData.value)
    );

    function addToCart(item: {
      title: string;
      category: string;
      price: number;
      imageUrl: string;
      id: number;
    }): void {
      cartData.value[item.id] = item;
      ElNotification({
        title: "Add to cart",
        message: "Item has been added to cart !",
        type: "success",
        duration: 3000,
      });
    }

    function delCartItem(id: number = 0): void {
      if (id === 0) {
        cartData.value = {};
        return;
      }
      delete cartData.value[id];
    }

    function switchShowCart() {
      showCart.value = !showCart.value;
    }

    return {
      deviceSize,
      isMobile,
      isDesktop,
      isSmallDesktop,
      isBigDesktop,
      myFavourite,
      cartIdData,
      showCart,
      switchShowCart,
      addToCart,
      delCartItem,
      cartData,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["myFavourite", "cartData"], //指定持久化state
    },
  }
);
