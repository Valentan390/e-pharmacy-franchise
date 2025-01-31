import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthUserState } from "../../types";

export const handlerPending = (state: AuthUserState) => {
  state.isLoading = true;
  state.error = null;
};

export const handlerRejected = (
  state: AuthUserState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload;
};
