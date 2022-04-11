import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue';
import '@/assets/base.css';

const app = createApp(App);

app.use(
  createAuth0({
    domain: 'dev-19jj922m.us.auth0.com',
    client_id: 'udKlSEpcQbruRiCKnFHCfH0P5uB9I444',
    redirect_uri: window.location.origin,
  })
);

const pinia = createPinia();
app.use(pinia);
app.use(router);
pinia.use(piniaPluginPersistedstate);

app.mount('#app');
