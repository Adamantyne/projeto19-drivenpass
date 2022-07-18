import { Router } from "express";

import authValidator from "../middlewares/authValidator.js";
import {
  getRecords,
  getCredentials,
  postCredential,
  deleteCredential,
} from "../controllers/recordsController.js";
import {
  postCredentialMiddleware,
  checkCredentialMiddleware,
} from "../middlewares/recordsMiddleware.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { credentialSchema } from "../schemas/recordsSchemas.js";

const recordsRouter = Router();

recordsRouter.use(authValidator);

recordsRouter.get("/records", getRecords);

recordsRouter.get("/credentials", getCredentials);
recordsRouter.get(
  "/credentials/:id",
  checkCredentialMiddleware,
  getCredentials
);
recordsRouter.post(
  "/credentials",
  schemaValidator(credentialSchema),
  postCredentialMiddleware,
  postCredential
);
recordsRouter.delete(
  "/credentials/:id",
  checkCredentialMiddleware,
  deleteCredential
);

export default recordsRouter;
