import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MobileMenuState {
  isMobileMenuOpen: boolean;
}

const initialState: MobileMenuState = {
  isMobileMenuOpen: false,
};

export const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState,
  reducers: {
    setMobileMenu: (state, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload === "boolean") {
        state.isMobileMenuOpen = action.payload;
      } else {
        state.isMobileMenuOpen = !state.isMobileMenuOpen;
      }
    },
  },
});

export const { setMobileMenu } = mobileMenuSlice.actions;

export const mobileMenuReduсer = mobileMenuSlice.reducer;
