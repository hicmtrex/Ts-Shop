import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: () => import('../views/ProductDetail.vue'),
      props: true,
    },
    {
      path: '/cart',
      name: 'CartView',
      component: () => import('../views/cart/CartView.vue'),
    },
    {
      path: '/cart/address',
      name: 'Address',
      component: () => import('../views/cart/Address.vue'),
    },
    {
      path: '/cart/checkout',
      name: 'Checkout',
      component: () => import('../views/cart/Checkout.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue'),
    },
    {
      path: '/auth/profile',
      name: 'Profile',
      component: () => import('../views/auth/Profile.vue'),
    },
  ],
});

export default router;
