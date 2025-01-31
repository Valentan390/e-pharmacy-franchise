import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  currentRequest,
  logoutRequest,
  signinRequest,
  signupRequest,
} from "../../servicesApi";
import {
  AuthCurrentResponse,
  AuthLogoutResponse,
  AuthSigninResponse,
  AuthSignupResponse,
  SigninRequestBody,
  SignupRequestBody,
} from "../../types";
import axios from "axios";
import { RootState } from "../store";

export const signupThunk = createAsyncThunk<
  AuthSignupResponse,
  SignupRequestBody,
  { rejectValue: string }
>("auth/signup", async (body, { rejectWithValue }) => {
  try {
    const data = await signupRequest(body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const signinThunk = createAsyncThunk<
  AuthSigninResponse,
  SigninRequestBody,
  { rejectValue: string }
>("auth/signin", async (body, { rejectWithValue }) => {
  try {
    const data = await signinRequest(body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const logoutThunk = createAsyncThunk<
  AuthLogoutResponse,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const data = await logoutRequest();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const currentThunk = createAsyncThunk<
  AuthCurrentResponse,
  void,
  { rejectValue: string; state: RootState }
>(
  "auth/curretnt",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { authUser } = getState();

      if (!authUser || !authUser.token) {
        return rejectWithValue("No authentication token found.");
      }

      const data = await currentRequest(authUser.token);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
  {
    condition: (_, { getState }) => {
      const { authUser } = getState();
      return authUser?.token ? true : false;
    },
  }
);
