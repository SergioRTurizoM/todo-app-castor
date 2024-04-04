import { createContext, FC, ReactNode, useState } from "react";
import { AuthContextType } from "../types/types";
import { User } from "firebase/auth";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: null,
  signOut: null,
});

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const getFromSessionStorage = () => {
    const userFromSessionStorage = sessionStorage.getItem("user");

    if (userFromSessionStorage) {
      return JSON.parse(userFromSessionStorage);
    }
    return null;
  };
  const [user, setUser] = useState<User | null>(getFromSessionStorage());
  const setToSessionStorage = (user: User) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const removeFromSessionStorage = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    setUser: setToSessionStorage,
    signOut: removeFromSessionStorage,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
