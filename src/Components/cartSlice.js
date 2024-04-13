import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  products: [],
  total: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearCart: (state, action) => {
      state.cartProducts = [];
    },
    fetchProducts: (state) => {
      state.isLoading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.products.push(action.payload);
      state.isLoading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    increment: (state) => {
      state.total++;
    },
  },
});

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  addToCart,
  removeFromCart,
  clearCart,
  increment,
} = cartSlice.actions;

export default cartSlice.reducer;