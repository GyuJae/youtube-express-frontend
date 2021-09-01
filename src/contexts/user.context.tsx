import React, { createContext, ReactNode, useContext, useState } from "react";
import { TOKEN } from "../contants";
import { tokenVerify } from "../utils/tokenVerify";

interface IUser {
  _id: string;
  email: string;
  password: string;
  username: string;
  avatarUrl: string;
}

interface State {
  user: IUser | null;
}

const UserContext = createContext<State>({
  user: null,
});

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem(TOKEN);
  const [user, setUser] = useState<IUser | null | any>(null);
  if (token) {
    const tokenUser = tokenVerify(token);
    setUser(tokenUser);
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};
