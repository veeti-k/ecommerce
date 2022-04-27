export type Address = {
  addressId: string;
  name: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
};

export type Session = {
  sessionId: string;
  createdAt: string;
  lastUsedAt: string;
  isCurrentSession: boolean;
};

export type User = {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  flags: number;
  createdAt: string;
  addresses: Address[];
  sessions: Session[];
};
