import { Router } from "express";

import authValidator from "../../middlewares/authValidator.js";
import {
  getCredentials,
  postCredential,
  deleteCredential,
} from "../../controllers/records/credentialsController.js";
import {
  postCredentialMiddleware,
  checkCredentialMiddleware,
} from "../../middlewares/recordsMiddleware.js";
import schemaValidator from "../../middlewares/schemaValidator.js";
import { credentialSchema } from "../../schemas/recordsSchemas.js";

const credentialsRouter = Router();

//credentialsRouter.use(authValidator);

credentialsRouter.get("/credentials",authValidator, getCredentials );
credentialsRouter.get(
  "/credentials/:id",
  authValidator,
  checkCredentialMiddleware,
  getCredentials
);
credentialsRouter.post(
  "/credentials",
  authValidator,
  schemaValidator(credentialSchema),
  postCredentialMiddleware,
  postCredential
);
credentialsRouter.delete(
  "/credentials/:id",
  authValidator,
  checkCredentialMiddleware,
  deleteCredential
);

export default credentialsRouter;
