import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { mobileMenuReduсer } from "./mobileMenu/mobileMenuSlice";
import { authUserReducer } from "./authUser/authUserSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistConfig, authUserReducer);

const rootReducer = combineReducers({
  mobileMenu: mobileMenuReduсer,
  authUser: persistedAuthReducer,
});

export default rootReducer;
