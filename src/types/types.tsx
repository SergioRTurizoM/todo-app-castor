import { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  setUser: ((user: User) => void) | null;
  signOut: (() => void) | null;
};
