import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  isLoadingCart: true,
  listCart: [],
  listCartFirst: [],
  totalProduct: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    displayCart: (state, action) => {
      state.listCart = action.payload;
      state.listCartFirst = action.payload;
      state.isLoadingCart = false;
      localStorage.setItem("listCart", JSON.stringify(action.payload));
    },
    doFetchListCartPending: (state) => {
      state.isLoadingCart = true;
    },

    doFetchListCartError: (state) => {
      state.isLoadingCart = false;
    },

    deleteProduct: (state, action) => {
      const newCart = state.listCart.filter((item) => {
        return item.productId._id !== action.payload;
      });
      state.listCart = newCart;
      localStorage.setItem("listCart", JSON.stringify(newCart));
    },

    doLogoutCart: (state, action) => {
      state.isLoadingCart = false;
      state.listCart = [];
      state.listCartFirst = [];
      localStorage.removeItem("listCart");
    },

    addToCartService: (state, action) => {
      const itemIndex = state.listCart.findIndex(
        (item) => item.productId._id === action.payload._id
      );
      if (itemIndex < 0) {
        state.listCart.push({ productId: action.payload, quantity: 1 });
        message.success("Đã thêm sản phẩm vào giỏ hàng");

        localStorage.setItem("listCart", JSON.stringify(state.listCart));
        return;
      }
      if (state.listCart[itemIndex].quantity === 20) {
        message.error("Quá số lượng cho phép");
        return;
      }
      state.listCart[itemIndex].quantity += 1;
      message.success("Đã thêm sản phẩm vào giỏ hàng");

      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },

    increaseQuantity: (state, action) => {
      const itemIndex = state.listCart.findIndex(
        (item) => item.productId._id === action.payload
      );

      if (state.listCart[itemIndex].quantity === 20) {
        message.error("Quá số lượng cho phép");
        return;
      }

      state.listCart[itemIndex].quantity += 1;

      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },

    decreaseQuantity: (state, action) => {
      const itemIndex = state.listCart.findIndex(
        (item) => item.productId._id === action.payload
      );

      if (state.listCart[itemIndex].quantity > 1) {
        state.listCart[itemIndex].quantity -= 1;
      } else if (state.listCart[itemIndex].quantity === 1) {
        const newCart = state.listCart.filter((item) => {
          return item.productId._id !== action.payload;
        });
        state.listCart = newCart;
      }

      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },

    deleteAllCart: (state, action) => {
      state.listCart = [];
      state.isLoadingCart = false;
      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },

    //CART FOR LOCAL STORAGE
  },

  extraReducers: (builder) => {},
});

export const {
  doFetchListCartPending,
  displayCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  doLogoutCart,
  doFetchListCartError,
  addToCartService,
  deleteAllCart,
} = cartSlice.actions;

export default cartSlice.reducer;
