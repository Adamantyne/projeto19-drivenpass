import Joi from "joi";
import { Credential } from "@prisma/client";

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
