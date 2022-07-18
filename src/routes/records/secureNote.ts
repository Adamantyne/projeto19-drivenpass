import { Router } from "express";

import authValidator from "../../middlewares/authValidator.js";
import {
  getSecureNote,
  postSecureNote,
  deleteSecureNote,
} from "../../controllers/records/secureNoteController.js";
import {
  postSecureNoteMiddleware,
  checkSecureNoteMiddleware,
} from "../../middlewares/recordsMiddleware.js";
import schemaValidator from "../../middlewares/schemaValidator.js";
import { secureNoteSchema } from "../../schemas/recordsSchemas.js";

const secureNoteRouter = Router();

secureNoteRouter.use(authValidator);

secureNoteRouter.get("/secureNote", getSecureNote);
secureNoteRouter.get(
  "/secureNote/:id",
  checkSecureNoteMiddleware,
  getSecureNote
);
secureNoteRouter.post(
  "/secureNote",
  schemaValidator(secureNoteSchema),
  postSecureNoteMiddleware,
  postSecureNote
);
secureNoteRouter.delete(
  "/secureNote/:id",
  checkSecureNoteMiddleware,
  deleteSecureNote
);

export default secureNoteRouter;