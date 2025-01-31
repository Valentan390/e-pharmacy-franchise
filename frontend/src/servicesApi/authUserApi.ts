import axios from "axios";
import {
  AuthCurrentResponse,
  AuthLogoutResponse,
  AuthSigninResponse,
  AuthSignupResponse,
  SigninRequestBody,
  SignupRequestBody,
} from "../types";

const baseURLApi = import.meta.env.VITE_BASE_URL_API;

const authInstance = axios.create({
  baseURL: `${baseURLApi}`,
});

const setToken = (token: string | null) => {
  authInstance.defaults.headers.authorization = token ? `Bearer ${token}` : "";
};

export const signupRequest = async (body: SignupRequestBody) => {
  const { data } = await authInstance.post<AuthSignupResponse>(
    "/user/register",
    body
  );

  return data;
};

export const signinRequest = async (body: SigninRequestBody) => {
  const { data } = await authInstance.post<AuthSigninResponse>(
    "/user/login",
    body
  );
  setToken(data.data.accessToken);
  return data;
};

export const logoutRequest = async () => {
  const { data } = await authInstance.post<AuthLogoutResponse>("/user/logout");
  setToken(null);
  return data;
};

export const currentRequest = async (token: string) => {
  setToken(token);
  try {
    const { data } = await authInstance.get<AuthCurrentResponse>(
      "/user/user-info"
    );
    return data;
  } catch (error) {
    setToken(null);
    throw error;
  }
};
