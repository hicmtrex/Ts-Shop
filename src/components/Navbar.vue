<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useCartShop } from '@/stores/cart';
import { useAddress } from '@/stores/address';
export default defineComponent({
  name: 'Navbar',
  setup() {
    const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
    const cart = useCartShop();
    const cartItems = computed(() => cart.cartItems);
    const address = useAddress();

    const logoutHandler = () => {
      logout({ returnTo: window.location.origin });
      cart.$reset();
      address.$reset();
    };

    return {
      isAuthenticated,
      user,
      cartItems,
      login: () => {
        loginWithRedirect();
      },
      logoutHandler,
    };
  },
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white px-0 py-3">
    <div class="container-xl">
      <!-- Logo -->
      <router-link class="navbar-brand" to="/">
        <h2>
          <em class="text-primary">Ts shop</em>
        </h2>
      </router-link>
      <!-- Navbar toggle -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Collapse -->
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <!-- Nav -->
        <div class="navbar-nav mx-lg-auto">
          <router-link
            class="nav-item nav-link active"
            to="/"
            aria-current="page"
            >Home</router-link
          >
          <a class="nav-item nav-link" href="/#products">Product</a>
          <a class="nav-item nav-link" href="#">Features</a>
          <router-link class="nav-item nav-link" to="/contact"
            >Contact</router-link
          >
        </div>
        <router-link
          class="nav-icon position-relative text-decoration-none"
          to="/cart"
        >
          <i class="bi bi-bag-fill"></i>
          <span
            class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-warning text-white"
          >
            {{ cartItems.length }}
          </span>
        </router-link>

        <a class="nav-icon position-relative" href="#" v-if="isAuthenticated">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div class="avatar rounded-circle h-4">
              <img :src="user.picture" alt="" class="h-10" />
            </div>
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <router-link class="dropdown-item" to="/auth/profile"
                >Profile</router-link
              >
            </li>

            <li><hr class="dropdown-divider" /></li>
            <li>
              <button @click="logoutHandler" class="dropdown-item">
                Logout
              </button>
            </li>
          </ul>
        </a>

        <div v-else class="navbar-nav ms-lg-4">
          <a @click="login" class="nav-item nav-link" href="#">Login </a>
        </div>
        <!-- Action -->
      </div>
    </div>
  </nav>
</template>

<style scoped>
i {
  font-size: 1.2rem;
  cursor: pointer;
}
em {
  font-size: 2rem;
  font-weight: bold;
}
</style>
