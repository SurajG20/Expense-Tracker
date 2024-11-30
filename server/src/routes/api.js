import express from "express";
import authRoutes from "./AuthRoutes.js";
import financeRoutes from "./FinanceRoutes.js";
import { RATE_LIMIT_OPTIONS, rateLimit } from "../common/rateLimiter.js";

import Middleware from "../middlewares/authentication.js";

const apiRouter = express.Router();

apiRouter.use("/v1/auth", rateLimit(RATE_LIMIT_OPTIONS(1, 5)), authRoutes);
apiRouter.use(
  "/v1/finance",
  rateLimit(RATE_LIMIT_OPTIONS(1, 5)),
  Middleware.authenticate,
  financeRoutes
);

export default apiRouter;
