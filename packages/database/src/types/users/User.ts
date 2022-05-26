import { DocumentStuff } from "..";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  flags: string;
}

export type UserDocument = IUser & DocumentStuff;
