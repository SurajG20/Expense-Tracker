import rateLimit from "express-rate-limit";

const RATE_LIMIT_OPTIONS = (windowMinutes, maxRequests) => ({
  windowMs: windowMinutes * 60 * 1000,
  max: maxRequests,
  message: "Too many requests, please try again later.",
  statusCode: 429,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: options.message,
      retryAfter: Math.ceil(options.windowMs / 1000),
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export { rateLimit, RATE_LIMIT_OPTIONS };
