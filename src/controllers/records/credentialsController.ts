import { Request, Response } from "express";
import { Credential } from "@prisma/client";

import { InputCredential } from "../../schemas/recordsSchemas.js";
import credentialsService from "../../services/credentialsService.js";

export async function getCredentials(req: Request, res: Response) {
  const userEmail = res.locals.userEmail;
  const credential: Credential = res.locals.entity;
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
  const credential:Credential = res.locals.entity;
  await credentialsService.deleteCredential(credential);
  return res.sendStatus(204);
}
