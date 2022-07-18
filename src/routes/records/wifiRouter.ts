import { Router } from "express";

import authValidator from "../../middlewares/authValidator.js";
import {
  getWifi,
  postWifi,
  deleteWifi,
} from "../../controllers/records/wifiController.js";
import {
  postWifiMiddleware,
  checkWifiMiddleware,
} from "../../middlewares/recordsMiddleware.js";
import schemaValidator from "../../middlewares/schemaValidator.js";
import { wifiSchema } from "../../schemas/recordsSchemas.js";

const wifiRouter = Router();

wifiRouter.use(authValidator);

wifiRouter.get("/wifi", getWifi);
wifiRouter.get("/wifi/:id", checkWifiMiddleware, getWifi);
wifiRouter.post(
  "/wifi",
  schemaValidator(wifiSchema),
  postWifiMiddleware,
  postWifi
);
wifiRouter.delete("/wifi/:id", checkWifiMiddleware, deleteWifi);

export default wifiRouter;
