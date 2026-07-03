import { z } from "zod";

export const createTableSchema = z.object({
  number: z
    .number({
      required_error: "Номер столу обов'язковий",
      invalid_type_error: "Номер має бути числом",
    })
    .int("Номер має бути цілим числом")
    .min(1, "Номер має бути не менше 1"),
  capacity: z
    .number({
      required_error: "Місткість обов'язкова",
      invalid_type_error: "Місткість має бути числом",
    })
    .int("Місткість має бути цілим числом")
    .min(1, "Місткість має бути не менше 1"),
  location: z.enum(["main_hall", "terrace", "vip", "bar"], {
    errorMap: () => ({
      message: "Зона має бути: main_hall, terrace, vip або bar",
    }),
  }),
  description: z
    .string()
    .max(300, "Максимум 300 символів")
    .trim()
    .optional()
    .default(""),
  isAvailable: z.boolean().optional().default(true),
});

// Для PUT — усі поля необов'язкові
export const updateTableSchema = createTableSchema.partial();
