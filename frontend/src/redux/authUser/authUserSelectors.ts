import { RootState } from "../store";

export const selectAuthLoading = (state: RootState) => state.authUser.isLoading;

export const selectAuthError = (state: RootState) => state.authUser.error;

export const selectIsLogin = (state: RootState) => state.authUser.isLogin;

export const selectToken = (state: RootState) => state.authUser.token;

export const selectUser = (state: RootState) => state.authUser.user;
