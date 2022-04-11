<script lang="ts">
import { useProducts } from '@/stores/useProducts';
import { computed, defineComponent, onMounted } from 'vue';
import Product from '../components/Product.vue';
import DefaultLayout from '../components/layouts/DefaultLayout.vue';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const main = useProducts();
    const products = computed(() => main.products);
    onMounted(main.getProductList);
    return { products };
  },
  components: { Product, DefaultLayout },
});
</script>

<template>
  <DefaultLayout>
    <main id="products" class="container">
      <h1 class="mb-2">Products</h1>
      <div class="row">
        <Product
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </main>
  </DefaultLayout>
</template>

<style scoped></style>
