import { z } from "zod";

export const newFormValidationSchema = z.object({
  task: z.string().min(1, { message: "O valor deve ser maior que 0" }),
  minutesAmount: z
    .number()
    .min(1, { message: "O valor deve ser maior que 5" })
    .max(60, { message: "O valor deve ser menor que 60" }),
});

export type NewCycleFormData = z.infer<typeof newFormValidationSchema>;
