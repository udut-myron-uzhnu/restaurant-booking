// Тиждень 9: API для зміни ролі користувача (тільки admin)
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { authorize } from "@/lib/authorize";

// PUT /api/users/[id] — зміна ролі
export async function PUT(request, { params }) {
  const { session, error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  const { id } = await params;

  try {
    const { role } = await request.json();

    // Валідація ролі
    if (!["user", "admin"].includes(role)) {
      return Response.json(
        { error: "Роль має бути 'user' або 'admin'" },
        { status: 400 }
      );
    }

    // Не дозволяємо змінити роль самому собі
    if (id === session.user.id) {
      return Response.json(
        { error: "Не можна змінити власну роль" },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return Response.json(
        { error: "Користувача не знайдено" },
        { status: 404 }
      );
    }

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
