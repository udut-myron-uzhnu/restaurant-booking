import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { registerSchema } from "@/lib/validations/user";
import { stripHtml } from "@/lib/sanitize";

export async function POST(request) {
  try {
    const data = await request.json();

    // Валідація через zod (замість ручної)
    const result = registerSchema.safeParse(data);
    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message);
      return Response.json({ error: messages.join(", ") }, { status: 400 });
    }

    const { email, password } = result.data;
    const name = stripHtml(result.data.name);

    await dbConnect();

    // Перевірка чи email вже зайнятий
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { error: "Користувач з таким email вже існує" },
        { status: 409 }
      );
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 12);

    // Створюємо користувача
    const user = await User.create({ name, email, password: hashedPassword });

    return Response.json(
      {
        message: "Реєстрація успішна",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return Response.json(
        { error: "Користувач з таким email вже існує" },
        { status: 409 }
      );
    }
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
