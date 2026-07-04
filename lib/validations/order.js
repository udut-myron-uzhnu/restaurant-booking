import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Невалідний ідентифікатор");

const orderItemInputSchema = z.object({
  table: objectIdSchema,
  guestCount: z.number().int().min(1).max(20),
});

export const createOrderSchema = z.object({
  // user — опціональний; враховується лише коли запит від admin.
  // Звичайний user не може створити замовлення на чуже ім'я: сервер
  // у цьому випадку поле ігнорує та бере session.user.id.
  user: objectIdSchema.optional(),
  items: z
    .array(orderItemInputSchema)
    .min(1, "Замовлення має містити хоча б один стіл")
    .max(20, "Максимум 20 столів"),
  notes: z.string().max(300).trim().optional().default(""),
});

export const updateOrderSchema = z
  .object({
    status: z
      .enum(["pending", "confirmed", "seated", "completed", "cancelled"])
      .optional(),
    notes: z.string().max(300).trim().optional(),
  })
  .refine((d) => Object.keys(d).length > 0, {
    message: "Немає даних для оновлення",
  });

// User може лише скасувати своє pending-замовлення
export const userUpdateOrderSchema = z.object({
  status: z.literal("cancelled"),
});
