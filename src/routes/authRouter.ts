import { Router } from "express";

import schemaValidator from "../middlewares/schemaValidator.js";
import { signSchema } from "../schemas/authSchemas.js";
import {
  signUpMiddleware,
  signInMiddleware,
} from "../middlewares/authMiddleware.js";
import { signIn, signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post(
  "/signUp",
  schemaValidator(signSchema),
  signUpMiddleware,
  signUp
);
authRouter.post(
  "/signIn",
  schemaValidator(signSchema),
  signInMiddleware,
  signIn
);
authRouter.post("/signOut");

export default authRouter;
