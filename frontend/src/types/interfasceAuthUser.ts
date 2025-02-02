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
