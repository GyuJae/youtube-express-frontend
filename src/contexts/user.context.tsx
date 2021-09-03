import React, { createContext, ReactNode, useContext, useState } from "react";
import { useEffect } from "react";
import { TOKEN } from "../contants";
import { IUser } from "../types/User.interface";
import { tokenVerify } from "../utils/tokenVerify";

interface State {
  user: IUser | null;
}

const UserContext = createContext<State>({
  user: null,
});

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const loadingUser = async (token: string) => {
    const tokenUser = await tokenVerify(token);
    if (tokenUser) {
      setUser(tokenUser.data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      loadingUser(token);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};
