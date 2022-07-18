import { Request, Response } from "express";

export async function getRecords(req: Request, res: Response) {
  const recordsTypes = [
    "Credenciais",
    "Notas seguras",
    "Cartões",
    "Senhas de Wi-fi",
  ];
  res.status(200).send(recordsTypes);
}