import { createRouter, createWebHistory } from "vue-router";
import Products from "../components/Product/Products.vue";
import Product from "../components/Product/Product.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "products",
      component: Products,
    },
    {
      path: "/product/:id",
      name: "product",
      component: Product,
    },
  ],
});

export default router;
