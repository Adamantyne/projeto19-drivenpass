import db from "../config/database.js";

import { InsertSession } from "../schemas/authSchemas.js";

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

const sessionRepository = {
  getLastSession,
  invalidatingSessionById,
  createSession
};
export default sessionRepository;
