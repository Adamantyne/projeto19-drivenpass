import { Request, Response } from "express";
import { Credential } from "@prisma/client";

import { InputCredential } from "../schemas/recordsSchemas.js";
import credentialsService from "../services/credentialsService.js";

export async function getRecords(req: Request, res: Response) {
  const recordsTypes = [
    "Credenciais",
    "Notas seguras",
    "Cartões",
    "Senhas de Wi-fi",
  ];
  res.status(200).send(recordsTypes);
}

export async function getCredentials(req: Request, res: Response) {
  const userEmail = res.locals.userEmail;
  const credential: Credential = res.locals.credential;
  const credentials = await credentialsService.getCredentials(
    userEmail,
    credential
  );
  return res.status(200).send(credentials);
}

export async function postCredential(req: Request, res: Response) {
  const userEmail: string = res.locals.userEmail;
  const inputData: InputCredential = req.body;
  await credentialsService.postCredential(userEmail, inputData);
  return res.sendStatus(201);
}

export async function deleteCredential(req: Request, res: Response) {
  const credential:Credential = res.locals.credential;
  await credentialsService.deleteCredential(credential);
  return res.sendStatus(204);
}
