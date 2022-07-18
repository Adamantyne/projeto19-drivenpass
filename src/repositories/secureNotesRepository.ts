import db from "../config/database.js";
import { InsertSecureNote } from "../schemas/recordsSchemas.js";

async function getByEmail(userEmail: string) {
  return await db.secureNote.findMany({
    where: {
      userEmail,
      deleteAt: null,
    },
  });
}

async function getByEmailAndId(userEmail: string, id: number) {
  return await db.secureNote.findFirst({
    where: {
      userEmail,
      id,
      deleteAt: null,
    },
  });
}

async function getByEmailAndTitle(userEmail: string, title: string) {
  return await db.secureNote.findFirst({
    where: {
      userEmail,
      title,
      deleteAt: null,
    },
  });
}

async function deleteSecureNote(id: number) {
  return await db.secureNote.update({
    where: { id },
    data: { deleteAt: new Date() },
  });
}

async function postSecureNote(secureNoteData: InsertSecureNote) {
  return await db.secureNote.create({ data: secureNoteData });
}

const secureNoteRepository = {
  getByEmailAndId,
  getByEmail,
  getByEmailAndTitle,
  postSecureNote,
  deleteSecureNote,
};
export default secureNoteRepository;
