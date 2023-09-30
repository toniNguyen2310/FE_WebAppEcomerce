import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../redux/account/accountSlice";
import menuReducer from "../redux/menu/menuSlice,";

export default configureStore({
  reducer: {
    menu: menuReducer,
    account: accountReducer,
  },
});
