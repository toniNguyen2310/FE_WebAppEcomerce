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

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import accountReducer from "../redux/account/accountSlice";
// import menuReducer from "../redux/menu/menuSlice,";
// import cartReducer from "../redux/cart/cartSlice";
// import { createStore } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["account", "menu"],
// };

// const rootReducer = combineReducers({
//   menu: menuReducer,
//   account: accountReducer,
//   cart: cartReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(persistedReducer);
// export const persistor = persistStore(store);
