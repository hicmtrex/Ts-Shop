<script lang="ts">
import type ProductType from '@/types/ProductType';
import { defineComponent } from '@vue/runtime-core';
import type { PropType } from 'vue';

export default defineComponent({
  props: {
    product: {
      required: true,
      type: Object as PropType<ProductType>,
    },
  },
  name: 'Product',
  setup(props) {
    return { product: props.product };
  },
});
</script>

<template>
  <div class="col-md-4 mb-2">
    <router-link :to="`/products/${product.id}`">
      <div class="card">
        <div class="px-2 pt-2 position-relative">
          <img alt="..." :src="product.thumbnail" class="card-img" />
          <button
            class="btn btn-square btn-white rounded-circle position-absolute top-6 end-6 transform scale-105-hover"
          >
            <i class="bi bi-basket"></i>
          </button>
        </div>
        <div class="card-body">
          <h3 class="text-base text-muted font-semibold mb-3">
            {{ product.title }}
          </h3>
          <span class="d-block h3 mb-0">${{ product.price }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 250px;
}
</style>
