<script lang="ts">
import { useCartShop } from '@/stores/cart';
import { useProductDetail } from '@/stores/useProducts';
import type ProductType from '@/types/ProductType';
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DefaultLayout from '../components/layouts/DefaultLayout.vue';

export default defineComponent({
  name: 'ProuctDetail',
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const main = useProductDetail();

    const cart = useCartShop();

    const product = computed(() => main.product);
    const getProductById = (proId: string) => {
      main.getProductById(proId);
    };

    const addToCart = (p: ProductType) => {
      cart.addToCart(p);
      router.push('/cart');
    };

    if (route.params.id) {
      getProductById(props.id);
    }

    onBeforeMount(() => {
      getProductById(props.id);
    });
    console.log(cart.cartItems);
    return {
      cart,
      product,
      addToCart,
    };
  },
  components: { DefaultLayout },
});
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <img class="w-full rounded-4" :src="product.thumbnail" alt="img" />
        </div>
        <div class="col-md-4 ms-8">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <h3>{{ product.title }}</h3>
            </li>
            <li class="list-group-item">
              <h4 class="d-flex justify-content-between align-items-center">
                <span>Price:</span>
                <span>${{ product.price }}</span>
              </h4>
            </li>
            <li class="list-group-item">
              <h5 class="d-flex justify-content-between align-items-center">
                <span>Rating:</span>
                <span>{{ product.rating }}</span>
              </h5>
            </li>
            <li class="list-group-item">
              <h5 class="d-flex justify-content-between align-items-center">
                <span>Category:</span>
                <span>{{ product.category }}</span>
              </h5>
            </li>

            <li class="list-group-item">
              {{ product.description }}
            </li>
            <li class="list-group-item">
              <button
                @click="addToCart(product)"
                class="btn btn-primary w-full"
              >
                Add To Cart
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
img {
  width: 100%;
  height: 550px;
}
</style>
