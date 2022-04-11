import axios from 'axios';
import { defineStore } from 'pinia';
import type { UserAddress } from './address';
import type { CartItems } from './cart';

export type Order = {
  cartItems: CartItems[];
  address: UserAddress;
  name: string;
  totalPrice: number;
};

export const useOrders = defineStore({
  id: 'orders',
  state: () => ({
    orders: [] as Order[],
  }),

  actions: {
    async createOrder(order: Order) {
      const { data } = await axios.post('/orders.json', order);
      this.orders = data;
    },
  },
});
