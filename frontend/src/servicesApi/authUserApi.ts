import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  AuthCurrentResponse,
  AuthLogoutResponse,
  AuthSigninResponse,
  AuthSignupResponse,
  RefreshRequest,
  SigninRequestBody,
  SignupRequestBody,
} from "../types";
import { logoutUser, updateToken } from "../redux/authUser/authUserSlice";

const baseURLApi = import.meta.env.VITE_BASE_URL_API;

const instance = axios.create({
  baseURL: `${baseURLApi}`,
  withCredentials: true,
});

// const setToken = (token: string | null) => {
//   instance.defaults.headers.authorization = token ? `Bearer ${token}` : "";
// };

const setToken = (token: string | null) => {
  if (token) {
    return (instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`);
  }
  instance.defaults.headers.common["Authorization"] = "";
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    const { store } = await import("../redux/store");

    if (
      error.response?.status === 401 &&
      originalRequest.url === "user/refresh"
    ) {
      store.dispatch(logoutUser());
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      originalRequest.url !== "user/refresh"
    ) {
      try {
        const { data } = await instance.post<RefreshRequest>("user/refresh");

        const token = data.data.accessToken;

        store.dispatch(updateToken(token));

        setToken(token);

        originalRequest.headers["Authorization"] = `Bearer ${token}`;

        return instance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutUser());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const signupRequest = async (body: SignupRequestBody) => {
  const { data } = await instance.post<AuthSignupResponse>(
    "/user/register",
    body
  );

  return data;
};

export const signinRequest = async (body: SigninRequestBody) => {
  const { data } = await instance.post<AuthSigninResponse>("/user/login", body);
  setToken(data.data.accessToken);
  return data;
};

export const logoutRequest = async () => {
  const { data } = await instance.post<AuthLogoutResponse>("/user/logout");
  setToken(null);
  return data;
};

export const currentRequest = async (token: string) => {
  setToken(token);
  try {
    const { data } = await instance.get<AuthCurrentResponse>("/user/user-info");
    return data;
  } catch (error) {
    setToken(null);
    throw error;
  }
};

export default instance;
