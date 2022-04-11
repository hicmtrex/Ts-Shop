<script lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, watch } from 'vue';
import DefaultLayout from '../../components/layouts/DefaultLayout.vue';
import { useAddress } from '@/stores/address';
import type { UserAddress } from '@/stores/address';
import { useRouter } from 'vue-router';
import FormContainer from '../../components/UI/FormContainer.vue';
import { useAuth0 } from '@auth0/auth0-vue';

export default defineComponent({
  setup() {
    const main = useAddress();
    const { isAuthenticated } = useAuth0();
    const shippingAddress = computed(() => main.shippingAddress);
    const router = useRouter();
    const address = reactive({
      address: '',
      city: '',
      postalCode: '',
      country: '',
    });

    onBeforeMount(() => {
      if (shippingAddress.value) {
        router.push('/cart/checkout');
      }
    });

    const onSubmit = () => {
      main.saveAddress(address as UserAddress);
      router.push('/cart/checkout');
    };
    watch(isAuthenticated, () => router.push('/'));
    return { address, onSubmit, main };
  },
  components: { DefaultLayout, FormContainer },
});
</script>
<template>
  <FormContainer>
    <h1 class="text-primary mb-4 text-center">
      Shipping Address<i class="bi bi-house-door-fill ms-4"></i>
    </h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label class="form-label" for="address">Address</label>
        <input
          class="form-control"
          type="text"
          name="address"
          id="address"
          v-model="address.address"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="city">City</label>
        <input
          class="form-control"
          type="text"
          name="city"
          id="city"
          v-model="address.city"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="postalCode">Postal Code</label>
        <input
          class="form-control"
          type="text"
          name="postalCode"
          id="postalCode"
          v-model="address.postalCode"
        />
      </div>
      <div class="form-group">
        <label class="form-label" for="country">Country</label>
        <input
          class="form-control"
          type="text"
          name="country"
          id="country"
          v-model="address.country"
        />
      </div>
      <div class="form-group mt-3">
        <button type="submit" class="btn btn-primary w-full">Checkout</button>
      </div>
    </form>
  </FormContainer>
</template>

<style scoped>
.form-label {
  font-size: 1.1rem;
  margin: 7px 0;
}
</style>
