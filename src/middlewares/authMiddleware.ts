import { NextFunction, Request, Response } from "express";
import bcrypt, { compareSync } from "bcrypt";

import { SignInput } from "../schemas/authSchemas.js";
import { throwErr } from "../utils/suportFunctions.js";
import userRepository from "../repositories/userRepository.js";

export async function signUpMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email }: SignInput = req.body;
  const alreadyExist = await userRepository.findByEmail(email);
  if (alreadyExist) {
    throwErr("conflict", "email already registered");
  }
  next();
}

export async function signInMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const inputData: SignInput = req.body;
  const user = await userRepository.findByEmail(inputData.email);

  if (!user) {
    throwErr("unauthorized", "unregistered email");
  }
  const validPassword = compareSync(inputData.password, user.password);
  if (!validPassword) {
    throwErr("unauthorized", "incorrect password");
  }
  res.locals.userData = user;
  next();
}
