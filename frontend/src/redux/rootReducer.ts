import { combineReducers } from "@reduxjs/toolkit";
import { mobileMenuReduсer } from "./mobileMenu/mobileMenuSlice";

const rootReducer = combineReducers({
  mobileMenu: mobileMenuReduсer,
});

export default rootReducer;
