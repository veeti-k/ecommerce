import { AuthVerifyUserResponse } from "./User";

export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface AuthVerifyResponse {
  valid: boolean;
  hasAccess: boolean;
  user: AuthVerifyUserResponse;
}
