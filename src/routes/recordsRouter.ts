import { Router } from "express";

import authValidator from "../middlewares/authValidator.js";
import { getRecords } from "../controllers/recordsController.js";
import credentialsRouter from "./records/credentialsRouter.js";
import wifiRouter from "./records/wifiRouter.js";
import cardRouter from "./records/cardRouter.js";
import secureNoteRouter from "./records/secureNote.js";

const recordsRouter = Router();

recordsRouter.use(credentialsRouter);
recordsRouter.use(wifiRouter);
recordsRouter.use(secureNoteRouter);
recordsRouter.use(cardRouter);

recordsRouter.get("/records",authValidator, getRecords);

export default recordsRouter;
