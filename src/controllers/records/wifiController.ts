import { Request, Response } from "express";
import { Wifi } from "@prisma/client";

import { InputWifi } from "../../schemas/recordsSchemas.js";
import wifiService from "../../services/wifiService.js";

export async function getWifi(req: Request, res: Response) {
  const userEmail = res.locals.userEmail;
  const wifi: Wifi = res.locals.entity;
  const wifis = await wifiService.getWifi(userEmail, wifi);
  return res.status(200).send(wifis);
}

export async function postWifi(req: Request, res: Response) {
  const userEmail: string = res.locals.userEmail;
  const inputData: InputWifi = req.body;
  await wifiService.postWifi(userEmail, inputData);
  return res.sendStatus(201);
}

export async function deleteWifi(req: Request, res: Response) {
  const wifi: Wifi = res.locals.entity;
  await wifiService.deleteWifi(wifi);
  return res.sendStatus(204);
}
