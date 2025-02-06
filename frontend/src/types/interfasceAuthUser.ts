import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  verify: boolean;
}

export interface AuthUserState {
  user: User | null;
  token: string;
  isLogin: boolean;
  isLoading: boolean;
  error: string | null | undefined;
}

export interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface SigninRequestBody {
  email: string;
  password: string;
}

export interface RefreshRequest {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface AuthSignupResponse {
  status: number;
  message: string;
}

export interface AuthSigninResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface AuthLogoutResponse {
  status: number;
  message: string;
}

export interface AuthCurrentResponse {
  status: number;
  message: string;
  user: User;
}

export type Name =
  | "username"
  | "email"
  | "password"
  | "phone"
  | "repitPassword";

export type Placeholder =
  | "User Name"
  | "Email address"
  | "Phone number"
  | "Password"
  | "Repit Password";

export interface AuthInputProps {
  name: Name;
  placeholder: Placeholder;
  register: UseFormRegister<SignupFormData | SigninFormData>;
  errors: FieldErrors;
  isValid: boolean;
}

export interface ItemsAuth {
  id: string;
  name: Name;
  placeholder: Placeholder;
}

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  phone: string;
  repitPassword: string;
}

export interface SigninFormData {
  email: string;
  password: string;
  repitPassword: string;
}

export type FormData = SignupFormData | SigninFormData;
