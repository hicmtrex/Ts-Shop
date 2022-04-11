<script lang="ts">
import { useRouter } from 'vue-router';

import { defineComponent } from '@vue/runtime-core';
import Navbar from '../Navbar.vue';
import Hero from '../Hero.vue';
import Footer from '../Footer.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import Loader from '../UI/Loader.vue';

export default defineComponent({
  name: 'default',
  setup() {
    const { isLoading } = useAuth0();
    const router = useRouter();
    const isHome = router.currentRoute.value.name === 'Home';
    return {
      isHome,
      isLoading,
    };
  },
  components: { Navbar, Hero, Footer, Loader },
});
</script>

<template>
  <Loader v-if="isLoading" />
  <div v-else>
    <Navbar />
    <Hero v-if="isHome" />
    <main class="main py-3">
      <slot>
        <RouterView :key="$route.path" />
      </slot>
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
