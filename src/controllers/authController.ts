import { User } from "@prisma/client";
import { Request, Response } from "express";

import { SignInput } from "../schemas/authSchemas.js";
import authServices from "../services/authServices.js";

export async function signIn(req:Request,res:Response) {
    const userData:User = res.locals.userData;
    const token = await authServices.createSession(userData);
    res.status(201).send({token});
}

export async function signUp(req:Request,res:Response) {
    const inputData:SignInput = req.body;
    await authServices.createUser(inputData);
    res.sendStatus(201);
}