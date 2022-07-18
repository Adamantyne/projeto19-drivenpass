import db from "../config/database.js";
import { InsertCredential } from "../schemas/recordsSchemas.js";

async function getByEmail(userEmail: string) {
  return await db.credential.findMany({
    where: {
      userEmail,
      deleteAt: null,
    },
  });
}

async function getByEmailAndId(userEmail: string, id: number) {
  return await db.credential.findFirst({
    where: {
      userEmail,
      id,
      deleteAt: null,
    },
  });
}

async function getByEmailAndTitle(userEmail: string, title: string) {
  return await db.credential.findFirst({
    where: {
      userEmail,
      title,
      deleteAt: null,
    },
  });
}

async function deleteCredential(id: number) {
  return await db.credential.update({
    where: { id },
    data: { deleteAt: new Date() },
  });
}

async function postCredeltial(credentialData: InsertCredential) {
  return await db.credential.create({ data: credentialData });
}

const credentialsRepository = {
  getByEmailAndId,
  getByEmail,
  getByEmailAndTitle,
  postCredeltial,
  deleteCredential,
};
export default credentialsRepository;
