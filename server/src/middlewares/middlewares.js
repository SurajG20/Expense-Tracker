import { StatusCodes } from "http-status-codes";
import config from "../config/config.js";

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
  console.error(err); // Log the error
  return res.status(statusCode).json({
    message: err.message,
    stack: config.ISLIVE === 1 ? "Internal Server Error" : err.stack,
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

function unauthorize(res) {
  return (message, data) => {
    return res.status(StatusCodes.OK).json({
      success: "unauthorize",
      message: message,
      result: data,
    });
  };
}

const responseMiddleware = (req, res, next) => {
  res.success = success(res);
  res.error = error(res);
  res.unauthorize = unauthorize(res);
  next();
};

export default { responseMiddleware, notFound, errorHandler };
