import { RootState } from "../store";

export const selectIsMobileMenu = (state: RootState) =>
  state.mobileMenu.isMobileMenuOpen;
