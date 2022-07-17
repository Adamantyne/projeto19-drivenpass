import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export function throwErr(
  type: "conflict" | "not_found" | "unauthorized" | "unprocessable_entity",
  message: string
) {
  throw { type, message };
}

export function createToken(data: {}) {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
}

export function validateToken(token: string) {
  const isValid = jwt.verify(token, process.env.JWT_SECRET);
  return isValid;
}
