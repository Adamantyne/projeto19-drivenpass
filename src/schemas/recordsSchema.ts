import Joi from "joi";
import { Card } from "@prisma/client";

type CardInput = Omit<Card,"id"|"userEmail"|"createAt"|"updateAt"|
"deleteAt">;

export const cardSchema = Joi.object<CardInput>({
    
});

