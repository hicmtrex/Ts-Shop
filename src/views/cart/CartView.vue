<script lang="ts">
import { useCartShop } from '@/stores/cart';
import { useAuth0 } from '@auth0/auth0-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayout from '../../components/layouts/DefaultLayout.vue';

export default defineComponent({
  name: 'CartView',
  setup(props) {
    const cart = useCartShop();
    const router = useRouter();
    const { isAuthenticated } = useAuth0();
    return {
      cart,
      router,
      isAuthenticated,
    };
  },
  components: { DefaultLayout },
});
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div class="row">
        <h2>Cart Shop</h2>
        <div class="col-md-8">
          <div
            v-if="cart.cartItems.length === 0"
            class="alert-danger p-3 rounded"
          >
            Your cart is empty
          </div>
          <ul v-else class="list-group list-group-flush">
            <li
              v-for="item in cart.cartItems"
              :key="item.id"
              class="list-group-item"
            >
              <div class="row d-flex align-items-center">
                <div class="col-md-1">
                  <img class="img-fluid rounded" :src="item.thumbnail" alt="" />
                </div>
                <div class="col-md-4">
                  {{ item.title }}
                </div>
                <div class="col-md-2">
                  {{ item.qty }}
                </div>
                <div class="col-md-2">${{ item.price }}</div>
                <div class="col-md-3">
                  <i
                    @click="cart.addToCart(item)"
                    class="bi bi-plus-circle-fill text-primary p-2"
                  ></i>

                  <i
                    @click="cart.removeFromCart(item)"
                    class="bi bi-dash-circle-fill text-primary"
                  ></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <h3>
                    Subtotal ({{
                      cart.cartItems.reduce((acc, curr) => acc + curr.qty, 0)
                    }}) Items
                  </h3>
                </li>
                <li class="list-group-item">
                  <h5 class="d-flex justify-content-between align-items-center">
                    <span>Items Price</span>
                    <span>${{ cart.itemsPrice.toFixed(2) }}</span>
                  </h5>
                </li>
                <li class="list-group-item">
                  <h6 class="d-flex justify-content-between align-items-center">
                    <span>Tax Price</span>
                    <span>${{ cart.taxPrice.toFixed(2) }}</span>
                  </h6>
                </li>
                <li class="list-group-item">
                  <h6 class="d-flex justify-content-between align-items-center">
                    <span>Shipping Price</span>
                    <span>${{ cart.shippingPrice }}</span>
                  </h6>
                </li>
                <li class="list-group-item">
                  <h6 class="d-flex justify-content-between align-items-center">
                    <span>Total Price</span>
                    <span>${{ cart.totalPrice.toFixed(2) }}</span>
                  </h6>
                </li>
                <li class="list-group-item">
                  <button
                    :disabled="!isAuthenticated"
                    @click="router.push('/cart/address')"
                    class="btn btn-primary w-full"
                  >
                    Confirm
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped>
.bi {
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
