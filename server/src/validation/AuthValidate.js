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

export default {
  userRegistrationSchema,
  userLoginSchema,
};
