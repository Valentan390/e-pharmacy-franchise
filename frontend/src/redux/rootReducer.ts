import { combineReducers } from "@reduxjs/toolkit";
import { mobileMenuReduсer } from "./mobileMenu/mobileMenuSlice";
import { authUserReducer } from "./authUser/authUserSlice";

const rootReducer = combineReducers({
  mobileMenu: mobileMenuReduсer,
  authUser: authUserReducer,
});

export default rootReducer;
