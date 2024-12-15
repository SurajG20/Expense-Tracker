import { ZodError } from "zod";

const validateData = ({ bodySchema, querySchema, paramsSchema }) => {
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
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.invalid("Invalid data", errorMessages);
      } else {
        res.invalid("Invalid data", error.message);
      }
    }
  };
};

export default validateData;
