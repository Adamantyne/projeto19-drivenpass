import { equal } from "joi";
import db from "../config/database.js";

import { SignInput,InsertSession } from "../schemas/authSchemas.js";

async function findByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

async function insertUser(inputData: SignInput) {
  return await db.user.create({ data: inputData });
}

async function getLastSession(userEmail: string) {
  return await db.session.findFirst({
    orderBy: {
      id: "desc",
    },
    take: 1,
    where: {
      userEmail,
      logoutAt: null,
    },
  });
}

async function invalidatingSessionById(sessionId: number) {
  return await db.session.update({
    where: {
      id: sessionId,
    },
    data: {
      logoutAt: new Date(),
    },
  });
}

async function createSession(sessionData:InsertSession) {
    return await db.session.create({data:sessionData});
  }

const userRepository = {
  findByEmail,
  insertUser,
  getLastSession,
  invalidatingSessionById,
  createSession
};
export default userRepository;
