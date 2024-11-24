import { z } from "zod";

const userRegistrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const querySchema = z.object({
  search: z.string().optional(),
  page: z.number().int().positive().optional(),
});

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export default {
  userLoginSchema,
  userRegistrationSchema,
  querySchema,
  paramsSchema,
};
