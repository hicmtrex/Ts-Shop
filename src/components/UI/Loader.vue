<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<template lang="">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<style scoped>
.spinner-border {
  width: 100px;
  height: 100px;
  margin: auto;
  display: block;
}
</style>
