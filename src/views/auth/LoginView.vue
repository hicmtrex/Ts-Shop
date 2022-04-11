<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '../../components/layouts/DefaultLayout.vue';
import FormContainer from '../../components/UI/FormContainer.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { DefaultLayout, FormContainer },
});
</script>

<template>
  <FormContainer :title="'Login your account'">
       
    <form @submit.prevent="">
      <div class="form-group">
        <label class="form-label" for="email">Email</label>
        <input class="form-control" type="email" name="email" id="email" />
      </div>
      <div class="form-group">
        <label class="form-label" for="password">Password</label>
        <input
          class="form-control"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div class="form-group">
        <button class="btn btn-primary w-full mt-4">Login</button>
      </div>
    </form>
  </FormContainer>
</template>

<style scoped>
.form-label {
  font-size: 1.2rem;
  margin-bottom: 5px;
}
</style>
