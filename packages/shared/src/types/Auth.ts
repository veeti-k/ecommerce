import { AuthVerifyUserResponse } from "shared2";

export interface AuthVerifyResponse {
  valid: boolean;
  hasAccess: boolean;
  user: AuthVerifyUserResponse;
}
