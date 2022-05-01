import { AuthVerifyUserResponse } from "./User";

export interface AuthVerifyResponse {
  valid: boolean;
  hasAccess: boolean;
  user: AuthVerifyUserResponse;
}
