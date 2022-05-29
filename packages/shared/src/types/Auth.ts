import { UserWOutPasswordDocument } from "shared2";

export interface AuthVerifyResponse {
  valid: boolean;
  hasAccess: boolean;
  user: UserWOutPasswordDocument;
}
