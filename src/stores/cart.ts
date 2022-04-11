import type ProductType from '@/types/ProductType';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export type CartItems = {
  id: string | number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: [string];
  qty: number;
};
export const STORAGE_CART = 'vuets-pinia-cart';
export const cartStorage = localStorage.getItem(STORAGE_CART);

export const useCartShop = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItems[],
  }),
  persist: true,
  getters: {
    itemsPrice: (state) => {
      return state.cartItems.reduce(
        (acc, curr) => acc + curr.price * curr.qty,
        0
      );
    },
    taxPrice(): number {
      return this.itemsPrice * 0.06;
    },
    shippingPrice(): number {
      return this.itemsPrice >= 500 ? 0 : 50;
    },
    totalPrice(): number {
      return this.itemsPrice + this.taxPrice + this.shippingPrice;
    },
  },
  actions: {
    addToCart(product: ProductType) {
      const exist = this.cartItems.find((c) => c.id == product.id);

      if (exist) {
        exist.qty++;
      } else {
        this.cartItems.unshift({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
          thumbnail: product.thumbnail,
          images: product.images,
          qty: 1,
        });
      }
    },
    removeFromCart(product: ProductType) {
      const exist = this.cartItems.find((c) => c.id === product.id);
      if (exist) {
        if (exist.qty === 1) {
          this.cartItems = this.cartItems.filter(
            (item) => item.id !== product.id
          );
        } else {
          exist.qty--;
        }
      }
    },
  },
});
