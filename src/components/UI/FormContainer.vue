<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';

export default defineComponent({
  props: {
    title: {
      type: String,
    },
  },
  setup() {
    return {};
  },
  components: { DefaultLayout },
});
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <div class="row py-3 justify-content-center">
        <div class="col-md-4">
          <div class="card p-2">
            <div class="card-body">
              <h2 class="text-center mb-2">{{ title }}</h2>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped></style>
