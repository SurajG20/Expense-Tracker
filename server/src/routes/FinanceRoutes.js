import express from "express";
import FinanceControllers from "../controllers/FinanceControllers.js";
import FinanceValidate from "../validation/FinanceValidate.js";
import validateData from "../middlewares/validation.js";

const router = express.Router();

router.get(
  "/",
  validateData({
    bodySchema: FinanceValidate.getFinancesSchema,
  }),
  FinanceControllers.getFinances
);

router.post(
  "/",
  validateData({
    bodySchema: FinanceValidate.createFinanceSchema,
  }),
  FinanceControllers.createFinance
);

router.delete(
  "/:id",
  validateData({
    paramsSchema: FinanceValidate.validateFinanceId,
  }),
  FinanceControllers.deleteFinance
);

router.put(
  "/:id",
  validateData({
    paramsSchema: FinanceValidate.validateFinanceId,
  }),
  FinanceControllers.updateFinance
);

export default router;
