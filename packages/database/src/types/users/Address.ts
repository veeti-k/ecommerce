import { DocumentStuff } from "..";

export interface IAddress {
  userId: string;
  name: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

export type AddressDocument = IAddress & DocumentStuff;
