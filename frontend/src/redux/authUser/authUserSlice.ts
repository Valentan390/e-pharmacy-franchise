import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  AuthCurrentResponse,
  AuthSigninResponse,
  AuthUserState,
} from "../../types";
import {
  currentThunk,
  logoutThunk,
  signinThunk,
  signupThunk,
} from "./authUserOperations";
import { handlerPending, handlerRejected } from "../../shared/functions/redux";

const initialState: AuthUserState = {
  user: null,
  token: "",
  isLogin: false,
  isLoading: false,
  error: null,
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, handlerPending)
      .addCase(signupThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signupThunk.rejected, handlerRejected)

      .addCase(signinThunk.pending, handlerPending)
      .addCase(
        signinThunk.fulfilled,
        (state, action: PayloadAction<AuthSigninResponse>) => {
          state.isLoading = false;
          state.error = null;
          state.isLogin = true;
          state.token = action.payload.data.accessToken;
        }
      )
      .addCase(signinThunk.rejected, handlerRejected)

      .addCase(logoutThunk.pending, handlerPending)
      .addCase(logoutThunk.fulfilled, (state) => {
        state.error = initialState.error;
        state.isLoading = initialState.isLoading;
        state.isLogin = initialState.isLogin;
        state.token = initialState.token;
        state.user = initialState.user;
      })
      .addCase(logoutThunk.rejected, handlerRejected)

      .addCase(currentThunk.pending, handlerPending)
      .addCase(
        currentThunk.fulfilled,
        (state, action: PayloadAction<AuthCurrentResponse>) => {
          state.isLoading = false;
          state.error = null;
          state.user = action.payload.user;
        }
      )
      .addCase(currentThunk.rejected, handlerRejected);
  },
});

export const authUserReducer = authUserSlice.reducer;
