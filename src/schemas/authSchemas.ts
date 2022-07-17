import Joi from "joi";
import { User,Session } from "@prisma/client";

export type SignInput = Omit<User, "id">;
export type InsertSession = Omit<Session, "id"|"createAt"|"logoutAt">;

export const signSchema = Joi.object<SignInput>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});
