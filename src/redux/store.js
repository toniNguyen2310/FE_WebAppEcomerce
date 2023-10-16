import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../redux/account/accountSlice";
import menuReducer from "../redux/menu/menuSlice,";
import cartReducer from "../redux/cart/cartSlice";

export default configureStore({
  reducer: {
    menu: menuReducer,
    account: accountReducer,
    cart: cartReducer,
  },
});
