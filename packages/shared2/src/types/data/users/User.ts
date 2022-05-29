import { DocumentStuff } from "../documentStuff";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  flags: string;
}

export type UserDocument = IUser & DocumentStuff;
export type UserWOutPasswordDocument = Omit<UserDocument, "password">;
export type AuthVerifyUserResponse = UserWOutPasswordDocument & {
  isEmployee: boolean;
  sessionId: string;
};
