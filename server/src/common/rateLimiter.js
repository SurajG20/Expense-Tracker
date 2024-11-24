import rateLimit from "express-rate-limit";

const RATE_LIMIT_OPTIONS = (time_in_min = 1, limit = 10) => {
  return {
    windowMs: time_in_min * 60 * 1000,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  };
};

export { rateLimit, RATE_LIMIT_OPTIONS };