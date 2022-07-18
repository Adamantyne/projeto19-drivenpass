import { Request, Response } from "express";
import { Card } from "@prisma/client";

import { InputCard } from "../../schemas/recordsSchemas.js";
import cardService from "../../services/cardService.js";

export async function getCard(req: Request, res: Response) {
  const userEmail = res.locals.userEmail;
  const card: Card = res.locals.entity;
  const cards = await cardService.getCard(
    userEmail,
    card
  );
  return res.status(200).send(cards);
}

export async function postCard(req: Request, res: Response) {
  const userEmail: string = res.locals.userEmail;
  const inputData: InputCard = req.body;
  await cardService.postCard(userEmail, inputData);
  return res.sendStatus(201);
}

export async function deleteCard(req: Request, res: Response) {
  const card:Card = res.locals.entity;
  await cardService.deleteCard(card);
  return res.sendStatus(204);
}
