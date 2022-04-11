<script lang="ts">
import { useAddress } from '@/stores/address';
import { useCartShop } from '@/stores/cart';
import { computed, defineComponent, watch } from 'vue';
import DefaultLayout from '../../components/layouts/DefaultLayout.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';
import { useOrders } from '@/stores/orders';
export default defineComponent({
  name: 'Checkout',
  setup() {
    const main = useAddress();
    const action = useOrders();
    const cart = useCartShop();
    const router = useRouter();
    const shippingAddress = computed(() => main.shippingAddress);
    const cartItems = computed(() => cart.cartItems);
    const { user, isAuthenticated } = useAuth0();

    const onSubmit = () => {
      const order = {
        address: {
          city: 'noob',
          postalCode: 'lows',
          address: 'gg',
          country: 'fqfs',
        },
        cartItems: cartItems.value,
        totalPrice: cart.totalPrice,
        name: 'noob',
      };
      action.createOrder(order);
    };

    watch(isAuthenticated, () => router.push('/'));

    const reset = () => {
      main.$reset();
    };
    return { shippingAddress, cartItems, reset, user, onSubmit };
  },
  components: { DefaultLayout },
});
</script>
<template>
  <DefaultLayout>
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <h2 class="mb-4 text-primary">User Info</h2>
          <ul class="list-group list-group-flush">
            <li class="list-group-list">
              <h4
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <span>Email:</span>
                <span>{{ user.email }}</span>
              </h4>
              <h4 class="d-flex justify-content-between align-items-center">
                <span>Address :</span>
                <span>
                  {{ shippingAddress.address }} {{ shippingAddress.city }}
                  {{ shippingAddress.postalCode }} {{ shippingAddress.country }}
                </span>
              </h4>
            </li>
          </ul>
          <hr />
          <h2 class="my-4 text-primary">Order Summray</h2>
          <ul class="list-group list-group-flush">
            <div class="card mb-2" v-for="item in cartItems" :key="item.id">
              <div class="card-body">
                <div class="row d-flex align-items-center">
                  <div class="col-md-2">
                    <img :src="item.thumbnail" class="card-img" alt="" />
                  </div>
                  <div class="col-md-4">
                    <h5>{{ item.title }}</h5>
                  </div>
                  <div class="col-md-2">
                    <strong>{{ item.qty }}</strong>
                  </div>
                  <div class="col-md-2">
                    <strong>${{ item.price }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
        <div class="col-md-4 ms-6">
          <div class="card">
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <h2 class="text-center text-primary">
                    Checkout
                    <i class="bi bi-bag-check-fill ms-4"></i>
                  </h2>
                </li>
                <li class="list-group-item">
                  <h5 class="d-flex justify-content-between">
                    <span>Total Price</span>
                    <span>$55</span>
                  </h5>
                </li>
                <li class="list-group-item">
                  <h5 class="d-flex justify-content-between">
                    <span>Total Price</span>
                    <span>$55</span>
                  </h5>
                </li>
                <li class="list-group-item">
                  <h5 class="d-flex justify-content-between">
                    <span>Total Price</span>
                    <span>$55</span>
                  </h5>
                </li>
                <li class="list-group-item">
                  <h5 class="d-flex justify-content-between">
                    <span>Total Price</span>
                    <span>$55</span>
                  </h5>
                </li>
                <li class="list-group-item">
                  <button @click="onSubmit" class="btn btn-primary w-full">
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
<style scoped></style>
