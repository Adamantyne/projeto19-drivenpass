import Joi from "joi";
import { Credential, Wifi, Card, SecureNote } from "@prisma/client";

//credentials
export type InsertCredential = Omit<
  Credential,
  "id" | "createAt" | "updateAt" | "deleteAt"
>;
export type InputCredential = Omit<InsertCredential, "userEmail">;

export const credentialSchema = Joi.object<InputCredential>({
  title: Joi.string().required(),
  userName: Joi.string().required(),
  password: Joi.string().required(),
  url: Joi.string().required(),
});

//wifi
export type InsertWifi = Omit<
  Wifi,
  "id" | "createAt" | "updateAt" | "deleteAt"
>;
export type InputWifi = Omit<InsertWifi, "userEmail">;

export const wifiSchema = Joi.object<InputWifi>({
  title: Joi.string().required(),
  password: Joi.string().required(),
  label: Joi.string().required(),
});

//card
const cardTypes = /^(credito|debito|credito_debito)$/;
const numberMask = /^[0-9]+$/;
const dataMask = /^(([0-1][0-9]))(\/)(([0-9][0-9]))$/;
export type InsertCard = Omit<
  Card,
  "id" | "createAt" | "updateAt" | "deleteAt"|"virtual"
>;
export type InputCard = Omit<InsertCard, "userEmail">;

export const cardSchema = Joi.object<InputCard>({
  cardNumber: Joi.string().pattern(numberMask).required(), 
  password: Joi.string().length(4).pattern(numberMask).required(),
  cvv: Joi.string().length(3).pattern(numberMask).required(),
  cardName: Joi.string().required(),
  expirationDate: Joi.string().pattern(dataMask).required(),
  type: Joi.string().pattern(cardTypes).required(),
});

//secyre notes
export type InsertSecureNote = Omit<
  SecureNote,
  "id" | "createAt" | "updateAt" | "deleteAt"
>;
export type InputSecureNote = Omit<InsertSecureNote, "userEmail">;

export const secureNoteSchema = Joi.object<InputSecureNote>({
  title: Joi.string().max(50).required(),
  note: Joi.string().max(1000).required()
});
