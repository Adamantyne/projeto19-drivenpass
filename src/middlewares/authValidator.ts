import { NextFunction, Request, Response } from "express";

import { throwErr, validateToken } from "../utils/suportFunctions";

export default async function authValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  const token = authorization?.split(" ")[1]?.trim();
  if (!token) {
    throwErr("unauthorized", "You must be logged in to do this.");
  }
  const userData = validateToken(token);
  console.log(userData);
  res.sendStatus(200);
  next();
}
