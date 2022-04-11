import { defineStore } from 'pinia';

export type UserAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export const useAddress = defineStore({
  id: 'shippingAdress',
  state: () => ({
    shippingAddress: null as UserAddress | null,
  }),
  actions: {
    saveAddress(address: UserAddress) {
      this.shippingAddress = address;
    },
  },
  persist: true,
});
