export type Address = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
};

export type Session = {
  id: string;
  createdAt: string;
  lastUsedAt: string;
  isCurrentSession: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  flags: number;
  createdAt: string;
  addresses: Address[];
  sessions: Session[];
};
