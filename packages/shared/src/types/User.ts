import { Address } from "./Address";
import { Session } from "./Session";

export interface User {
  UserId: number;
  Name: string;
  Email: string;
  PhoneNumber: string | null;
  Flags: bigint;
  CreatedAt: Date;
  Password: string;

  Addresses: Address[];
  Sessions: Session[];
}
