export interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  flags: bigint;
  createdAt: Date;
}

export interface AuthVerifyUserResponse
  extends Omit<User, "password" | "addresses" | "sessions" | "flags"> {
  isEmployee: boolean;
  flags: number;
}

export interface SeededUser extends Omit<User, "userId" | "addresses" | "sessions"> {}
