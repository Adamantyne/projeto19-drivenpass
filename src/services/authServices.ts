import { User } from "@prisma/client";
import bcrypt from "bcrypt";

import userRepository from "../repositories/userRepository.js";
import sessionRepository from "../repositories/sessionRepository.js";

import { SignInput } from "../schemas/authSchemas.js";
import { createToken } from "../utils/suportFunctions.js";

async function createUser({ email, password }: SignInput) {
  const sault = 10;
  const encryptedPassword = bcrypt.hashSync(password, sault);
  await userRepository.insertUser({ email, password: encryptedPassword });
}

async function createSession({ email, id }: User) {
  const token = createToken({ email, id });
  await invalidatingLastSession(email);
  await sessionRepository.createSession({ userEmail: email, token });
  return token;
}

async function invalidatingLastSession(email: string) {
  const lastSession = await sessionRepository.getLastSession(email);
  if (lastSession) {
    await sessionRepository.invalidatingSessionById(lastSession.id);
  }
}

const authServices = { createUser,createSession,invalidatingLastSession };
export default authServices;
