import { Router } from "express";

import authValidator from "../../middlewares/authValidator.js";
import {
  getCard,
  postCard,
  deleteCard,
} from "../../controllers/records/cardController.js";
import {
  postCardMiddleware,
  checkCardMiddleware,
} from "../../middlewares/recordsMiddleware.js";
import schemaValidator from "../../middlewares/schemaValidator.js";
import { cardSchema } from "../../schemas/recordsSchemas.js";

const cardRouter = Router();

cardRouter.use(authValidator);

cardRouter.get("/card", getCard);
cardRouter.get(
  "/card/:id",
  checkCardMiddleware,
  getCard
);
cardRouter.post(
  "/card",
  schemaValidator(cardSchema),
  postCardMiddleware,
  postCard
);
cardRouter.delete(
  "/card/:id",
  checkCardMiddleware,
  deleteCard
);

export default cardRouter;