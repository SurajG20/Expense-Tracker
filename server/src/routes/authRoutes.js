import express from "express";
import AuthControllers from "../controllers/AuthControllers.js";
import AuthValidate from "../validation/AuthValidate.js";
import validateData from "../middlewares/validation.js";
const router = express.Router();

router.post(
  "/login",
  validateData({
    bodySchema: AuthValidate.userLoginSchema,
  }),
  AuthControllers.Login
);

router.post(
  "/register",
  validateData({
    bodySchema: AuthValidate.userRegistrationSchema,
  }),
  AuthControllers.Register
);

export default router;
