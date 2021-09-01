import jwt from "jsonwebtoken";
import { userService } from "../api/api";

export const tokenVerify = async (token: string) => {
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
