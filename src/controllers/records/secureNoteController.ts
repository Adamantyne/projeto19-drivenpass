import { Request, Response } from "express";
import { SecureNote } from "@prisma/client";

import { InputSecureNote } from "../../schemas/recordsSchemas.js";
import secureNoteService from "../../services/secureNoteService.js";

export async function getSecureNote(req: Request, res: Response) {
  const userEmail = res.locals.userEmail;
  const secureNote: SecureNote = res.locals.entity;
  const secureNotes = await secureNoteService.getSecureNote(
    userEmail,
    secureNote
  );
  return res.status(200).send(secureNotes);
}

export async function postSecureNote(req: Request, res: Response) {
  const userEmail: string = res.locals.userEmail;
  const inputData: InputSecureNote = req.body;
  await secureNoteService.postSecureNote(userEmail, inputData);
  return res.sendStatus(201);
}

export async function deleteSecureNote(req: Request, res: Response) {
  const secureNote:SecureNote = res.locals.entity;
  await secureNoteService.deleteSecureNote(secureNote);
  return res.sendStatus(204);
}
