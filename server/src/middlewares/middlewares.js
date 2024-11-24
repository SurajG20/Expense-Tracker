import { StatusCodes } from "http-status-codes";

function notFound(req, res, next) {
  res.status(StatusCodes.NOT_FOUND);
  const error = new Error(`Path Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  const statusCode =
    res.statusCode !== StatusCodes.OK
      ? res.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.stack,
  });
}

function success(res) {
  return (message, data) => {
    return res.status(StatusCodes.OK).json({
      success: "true",
      message: message,
      result: data,
    });
  };
}

function error(res) {
  return (message, data) => {
    return res.status(StatusCodes.OK).json({
      success: "false",
      message: message,
      result: data,
    });
  };
}

const responseMiddleware = (req, res, next) => {
  res.success = success(res);
  res.error = error(res);
  next();
};

export default { responseMiddleware, notFound, errorHandler };
