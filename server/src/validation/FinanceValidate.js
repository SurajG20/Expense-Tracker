import { z } from "zod";

const createFinanceSchema = z.object({
  amount: z.number().positive(),
  category: z.string().min(3).max(255),
  date: z.string().date(),
  description: z.string().max(500),
  title: z.string().min(3).max(255),
  type: z.enum(["income", "expense"]),
});

const getFinancesSchema = z.object({
  type: z.string().optional(),
});

const validateFinanceId = z.object({
  id: z.string(),
});

const updateFinanceSchema = z.object({
  amount: z.number().positive().optional(),
  category: z.string().min(3).max(255).optional(),
  date: z.string().date().optional(),
  description: z.string().max(500).optional(),
  title: z.string().min(3).max(255).optional(),
  type: z.enum(["income", "expense"]).optional(),
});

export default {
  createFinanceSchema,
  getFinancesSchema,
  validateFinanceId,
  updateFinanceSchema,
};
