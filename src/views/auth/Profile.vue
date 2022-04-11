<script lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { DefaultLayout },
  setup() {
    const { user } = useAuth0();
    return { user };
  },
});
</script>
<template>
  <DefaultLayout>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img
                  :src="user.picture"
                  alt="Admin"
                  class="rounded-circle"
                  width="150"
                />

                <div class="mt-3">
                  <h4>{{ user.given_name }}</h4>
                  <p class="text-secondary mb-1">{{ user.email }}</p>
                  <p class="text-muted font-size-sm">
                    Bay Area, San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped></style>
