import { Router } from "express";

import authRouter from "./authRouter.js";
import recordsRouter from "./recordsRouter.js";

const routers = Router();
routers.use(authRouter);
routers.use(recordsRouter);

export default routers;