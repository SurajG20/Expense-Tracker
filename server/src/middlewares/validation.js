import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export function validateData({ bodySchema, querySchema, paramsSchema }) {
  return (req, res, next) => {
    try {
      if (bodySchema) {
        bodySchema.parse(req.body);
      }
      if (querySchema) {
        querySchema.parse(req.query);
      }
      if (paramsSchema) {
        paramsSchema.parse(req.params);
      }
      next();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
