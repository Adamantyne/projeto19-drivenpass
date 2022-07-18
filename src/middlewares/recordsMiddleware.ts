import { NextFunction, Request, Response } from "express";

import credentialsRepository from "../repositories/credentialsRepository.js";
import { InputCredential } from "../schemas/recordsSchemas.js";
import { throwErr } from "../utils/suportFunctions.js";

export async function postCredentialMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userEmail = res.locals.userEmail;
  const { title }: InputCredential = req.body;
  const alreadyExist = await credentialsRepository.getByEmailAndTitle(
    userEmail,
    title
  );
  if (alreadyExist) {
    throwErr("conflict", `credential "${title}" already registred`);
  }
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
    if (Number.isNaN(+id)) {
      throwErr("unauthorized", "id must be a numeric value");
    }
    const credential = await credentialsRepository.getByEmailAndId(
      userEmail,
      +id
    );
    if (!credential) {
      throwErr("not_found", "credential not found for this user");
    }
    res.locals.credential = credential;
  }
  next();
}
