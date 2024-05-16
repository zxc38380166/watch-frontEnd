import { createRouter, RouteRecordRaw, createWebHashHistory, Router } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    meta: {
      title: "首頁",
    },
    component: () => import("../views/layout/Layout.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/Home.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/about/About.vue"),
      },
      {
        path: "/watches",
        name: "watches",
        component: () => import("../views/watches/Watches.vue"),
      },
      {
        path: '/productPage/:productTitle',
        name: 'productPage',
        component: () => import('../views/watches/child/ProductPage.vue')
      },
      {
        path: "/faq",
        name: "faq",
        component: () => import("../views/faq/Faq.vue"),
      },
      {
        path: "/contact",
        name: "contact",
        component: () => import("../views/contact/Contact.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/order/Order.vue"),
        redirect: "/order/details",
        children: [
          {
            path: "details",
            name: "details",
            component: () => import("../views/order/child/Details.vue"),
          },
          {
            path: "checkout/:id",
            name: "checkout",
            component: () => import("../views/order/child/Checkout.vue"),
          },
          {
            path: "completedOrder/:id",
            name: "completedOrder",
            component: () => import("../views/order/child/CompletedOrder.vue"),
          },
        ],
      },
    ],
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
