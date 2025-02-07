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
import { toast } from "react-toastify";

export const signupThunk = createAsyncThunk<
  AuthSignupResponse,
  SignupRequestBody,
  { rejectValue: string }
>("auth/signup", async (body, { rejectWithValue }) => {
  try {
    const data = await signupRequest(body);
    toast.success(
      "Go to the email address you provided during registration to confirm your registration."
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        let message = "An error occurred";
        switch (status) {
          case 400:
            message = "Bad request (invalid request body).";
            break;
          case 404:
            message = "Service not found.";
            break;
          case 409:
            message = "Such email already exists.";
            break;
          case 500:
            message = "Server error.";
            break;
          default:
            message = "An unknown error occurred.";
        }
        toast.error(message);
        return rejectWithValue(message);
      } else if (error.request) {
        const message = "No response from the server. Please try again later.";
        toast.error(message);
        return rejectWithValue(message);
      } else {
        const message = `Request error: ${error.message}`;
        toast.error(message);
        return rejectWithValue(message);
      }
    } else if (error instanceof Error) {
      toast.error(`${error.message}`);
      return rejectWithValue(error.message);
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
    toast.success("You have successfully logged in.");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        let message = "An error occurred";
        switch (status) {
          case 400:
            message = "Bad request (invalid request body).";
            break;
          case 401:
            message = "Email or password invalid";
            break;
          case 404:
            message = "Service not found";
            break;
          case 500:
            message = "Server error.";
            break;
          default:
            message = "An unknown error occurred.";
        }
        toast.error(message);
        return rejectWithValue(message);
      } else if (error.request) {
        const message = "No response from the server. Please try again later.";
        toast.error(message);
        return rejectWithValue(message);
      } else {
        const message = `Request error: ${error.message}`;
        toast.error(message);
        return rejectWithValue(message);
      }
    } else if (error instanceof Error) {
      toast.error(`${error.message}`);
      return rejectWithValue(error.message);
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
    toast.success("You have been logged out.");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        let message = "An error occurred";
        switch (status) {
          case 401:
            message = "Unauthorized";
            break;
          case 404:
            message = "Service not found";
            break;
          case 500:
            message = "Server error.";
            break;
          default:
            message = "An unknown error occurred.";
        }
        toast.error(message);
        return rejectWithValue(message);
      } else if (error.request) {
        const message = "No response from the server. Please try again later.";
        toast.error(message);
        return rejectWithValue(message);
      } else {
        const message = `Request error: ${error.message}`;
        toast.error(message);
        return rejectWithValue(message);
      }
    } else if (error instanceof Error) {
      toast.error(`${error.message}`);
      return rejectWithValue(error.message);
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
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          let message = "An error occurred";
          switch (status) {
            case 401:
              message = "Unauthorized";
              break;
            case 404:
              message = "User not found.";
              break;
            case 500:
              message = "Server error.";
              break;
            default:
              message = "An unknown error occurred.";
          }
          toast.error(message);
          return rejectWithValue(message);
        } else if (error.request) {
          const message =
            "No response from the server. Please try again later.";
          toast.error(message);
          return rejectWithValue(message);
        } else {
          const message = `Request error: ${error.message}`;
          toast.error(message);
          return rejectWithValue(message);
        }
      } else if (error instanceof Error) {
        toast.error(`${error.message}`);
        return rejectWithValue(error.message);
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
