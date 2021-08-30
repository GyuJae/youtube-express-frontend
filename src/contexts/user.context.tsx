import axios from "axios";
import React, { createContext, ReactNode } from "react";

const TOKEN = "token";

interface IUser {
  _id: string;
  email: string;
  password: string;
  username: string;
  avatarUrl: string;
}

const UserContext = createContext<IUser | null>(null);

const getUser = () => {
  console.log(axios.defaults.headers);
};

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
};
