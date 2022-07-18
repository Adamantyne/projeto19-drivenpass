import { SecureNote } from "@prisma/client";

import secureNoteRepository from "../repositories/secureNotesRepository.js";
import { InputSecureNote, InsertSecureNote } from "../schemas/recordsSchemas.js";

async function getSecureNote(userEmail: string, secureNote?: SecureNote) {
  if (secureNote) {
    return { ...secureNote };
  }
  const secureNotes = await secureNoteRepository.getByEmail(userEmail);
  return secureNotes;
}

async function postSecureNote(userEmail: string, inputData: InputSecureNote) {

  const secureNoteData: InsertSecureNote = {
    userEmail,
    title: inputData.title,
    note: inputData.note,
  };
  
  await secureNoteRepository.postSecureNote(secureNoteData);
}

async function deleteSecureNote(secureNote: SecureNote) {
  await secureNoteRepository.deleteSecureNote(secureNote.id);
}

const secureNotesService = { getSecureNote, postSecureNote, deleteSecureNote };
export default secureNotesService;
