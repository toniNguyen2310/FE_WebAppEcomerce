import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../redux/account/accountSlice";
import counterReducer from "../redux/counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    account: accountReducer,
  },
});
