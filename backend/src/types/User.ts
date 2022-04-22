import { Address } from "./Address";
import { Session } from "./Session";

export interface User {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  flags: bigint;
  createdAt: Date;
  password: string;

  addresses: Address[];
  sessions: Session[];
}
