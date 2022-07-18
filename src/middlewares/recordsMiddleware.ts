import { NextFunction, Request, Response } from "express";

import wifiRepository from "../repositories/wifiRepositories.js";
import cardRepository from "../repositories/cardRepository.js";
import credentialsRepository from "../repositories/credentialsRepository.js";
import secureNoteRepository from "../repositories/secureNotesRepository.js";
import { InputCard, InputCredential, InputSecureNote, InputWifi } from "../schemas/recordsSchemas.js";
import { throwErr } from "../utils/suportFunctions.js";

//credentials
export async function postCredentialMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userEmail = res.locals.userEmail;
  const { title }: InputCredential = req.body;
  await alreadyExist(credentialsRepository.getByEmailAndTitle,userEmail,title)
  next();
}

export async function checkCredentialMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const userEmail = res.locals.userEmail;
  if (id) {
    const entity = await checkId(credentialsRepository.getByEmailAndId,userEmail,id)
    res.locals.entity = entity;
  }
  next();
}

//wifi
export async function postWifiMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userEmail = res.locals.userEmail;
  const { title }: InputWifi = req.body;
  await alreadyExist(wifiRepository.getByEmailAndTitle,userEmail,title)
  next();
}

export async function checkWifiMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const userEmail = res.locals.userEmail;
  if (id) {
    const entity = await checkId(wifiRepository.getByEmailAndId,userEmail,id)
    res.locals.entity = entity;
  }
  next();
}

//secure note
export async function postSecureNoteMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userEmail = res.locals.userEmail;
  const { title }: InputSecureNote = req.body;
  await alreadyExist(secureNoteRepository.getByEmailAndTitle,userEmail,title)
  next();
}

export async function checkSecureNoteMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const userEmail = res.locals.userEmail;
  if (id) {
    const entity = await checkId(secureNoteRepository.getByEmailAndId,userEmail,id)
    res.locals.entity = entity;
  }
  next();
}

//card
export async function postCardMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userEmail = res.locals.userEmail;
  const { cardNumber }: InputCard = req.body;
  await alreadyExist(cardRepository.getByEmailAndTitle,userEmail,cardNumber)
  next();
}

export async function checkCardMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const userEmail = res.locals.userEmail;
  if (id) {
    const entity = await checkId(cardRepository.getByEmailAndId,userEmail,id)
    res.locals.entity = entity;
  }
  next();
}

//suport functions
async function alreadyExist(query, userEmail: string, title: string) {
  const alreadyExist = await query(userEmail, title);
  if (alreadyExist) {
    throwErr("conflict", `entity "${title}" already registred`);
  }
}

async function checkId(query,userEmail:string,id:string) {
  if (Number.isNaN(+id)) {
    throwErr("unauthorized", "id must be a numeric value");
  }
  const entity = await query(userEmail,+id);
  if (!entity) {
    throwErr("not_found", "entity not found for this user");
  }
  return entity;
}
