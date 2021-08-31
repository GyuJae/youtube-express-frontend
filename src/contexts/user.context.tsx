import React, { createContext, ReactNode, useContext, useState } from "react";
import jwt from "jsonwebtoken";
import { userService } from "../api/api";

const TOKEN = "token";

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

const tokenVerify = async (token: string) => {
  const decoded = await jwt.verify(
    token,
    process.env.REACT_APP_JWT_PRIVATE_KEY as string
  );
  if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
    const userId = decoded["id"];
    const user = await userService.findById(userId);

    return user;
  }
  return null;
};

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
