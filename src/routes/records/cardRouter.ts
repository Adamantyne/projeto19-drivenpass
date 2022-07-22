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

//cardRouter.use(authValidator);

cardRouter.get("/card",authValidator, getCard);
cardRouter.get("/card/:id",authValidator, checkCardMiddleware, getCard);
cardRouter.post(
  "/card",
  authValidator,
  schemaValidator(cardSchema),
  postCardMiddleware,
  postCard,
);
cardRouter.delete("/card/:id",authValidator, checkCardMiddleware, deleteCard);

export default cardRouter;
