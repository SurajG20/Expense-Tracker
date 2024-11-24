import express from "express";
import authRoutes from "./authRoutes.js";
import { RATE_LIMIT_OPTIONS, rateLimit } from "../common/rateLimiter.js";

const apiRouter = express.Router();

apiRouter.use("/v1/auth", rateLimit(RATE_LIMIT_OPTIONS(1, 10)), authRoutes);

export default apiRouter;
