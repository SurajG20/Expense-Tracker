import express from "express";
import AuthControllers from "../controllers/AuthControllers.js";
import AuthValidate from "../validation/AuthValidate.js";
import { validateData } from "../middlewares/validation.js";
const router = express.Router();

router.post(
  "/login/:id",
  validateData({
    bodySchema: AuthValidate.userLoginSchema,
    paramsSchema: AuthValidate.paramsSchema,
  }),
  AuthControllers.Login
);

export default router;
