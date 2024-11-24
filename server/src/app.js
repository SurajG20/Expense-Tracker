import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/api.js";
import logger from "./common/logger.js";

import middlewares from "./middlewares/middlewares.js";
import { RATE_LIMIT_OPTIONS, rateLimit } from "./common/rateLimiter.js";
const app = express();

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(cors());

app.use(logger);

app.use(rateLimit(RATE_LIMIT_OPTIONS(10, 60)));

app.use(middlewares.responseMiddleware);

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.use("/", routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
