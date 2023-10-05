<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import Layout from "../Layout.vue";

const productId = useRoute().params.id;
const product = ref({});
let carousel = null;

onBeforeMount(() => {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json())
    .then((data) => {
      product.value = data;
      console.log(product.value);
    });
});
onMounted(() => {
  setTimeout(() => {
    carousel = new Flickity("#carousel", {});
  }, 500);
});

onBeforeUnmount(() => {
  carousel.destroy();
});
</script>

<template>
  <Layout>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <div class="mx-auto items" id="carousel">
            <div
              :style="`background-image:url(${item})`"
              class="item"
              v-for="(item, index) in product.images"
              :key="index"
            ></div>
          </div>
        </div>
        <div class="col-md-6">
          <h1 class="mb-3">{{ product.title }}</h1>
          <h2 class="text-success">${{ product.price }}</h2>
          <p class="mt-4">{{ product.description }}</p>
          <div class="rating">
            <span
              v-for="n in 5"
              :key="n"
              class="star"
              :class="{ filled: n <= product.rating }"
            >
              <template v-if="n <= product.rating">
                &#9733;
              </template>
              <template v-else-if="n - 0.5 === product.rating">
                &#9733;&#189;
              </template>
              <template v-else>
                &#9734;
              </template>
            </span>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.items {
  width: 500px;
  height: 400px;
}

.item {
  width: 500px;
  height: 400px;
  background-color: #ccc;
  background-size: cover;
}
.rating {
  font-size: 24px;
}

.star {
  color: #f48225;
  cursor: pointer;
}

.filled {
  color: #f48225;
}
</style>
