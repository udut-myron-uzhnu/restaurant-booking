// Тиждень 12: Zod-схеми для форм автентифікації (login, register)
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email обов'язковий" })
    .email("Некоректний формат email")
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: "Пароль обов'язковий" })
    .min(1, "Пароль обов'язковий"),
});

// confirmPassword — поле лише для інтерфейсу; на сервер не передається
export const registerFormSchema = z
  .object({
    name: z.string().min(2, "Мінімум 2 символи").max(50, "Максимум 50 символів").trim(),
    email: z.string().email("Некоректний формат email").toLowerCase().trim(),
    password: z.string().min(6, "Мінімум 6 символів").max(100, "Максимум 100 символів"),
    confirmPassword: z.string().min(6, "Мінімум 6 символів"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не збігаються",
    path: ["confirmPassword"],
  });
