import type ProductType from '@/types/ProductType';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useProducts = defineStore({
  id: 'products',
  state: () => ({
    products: [] as ProductType[],
    product: null,
    loading: false as boolean,
    error: null,
  }),
  actions: {
    async getProductList() {
      try {
        this.loading = true;
        const res = await axios.get('https://dummyjson.com/products');
        if (res.data) {
          this.loading = false;
          this.products = res.data.products;
        }
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
  },
});

export const useProductDetail = defineStore('productId', {
  state: () => {
    return {
      product: {} as ProductType,
      loading: false,
      error: null,
    };
  },
  actions: {
    async getProductById(id: string) {
      try {
        this.loading = true;
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        if (res.data) {
          this.loading = false;
          this.product = res.data;
        }
      } catch (err) {
        this.loading = false;
      }
    },
  },
});
