import { createMiddleware } from "hono/factory";
import { getAuth } from "../auth";

export const requireAuth = createMiddleware(async (c, next) => {
  const auth = getAuth(c.env as any);

  // রিকোয়েস্ট থেকে সেশন বের করা
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session || !session.user) {
    return c.json({ error: "Unauthorized access. Please login first." }, 401);
  }

  c.set("user", session.user);
  await next();
});

// ২. শুধুমাত্র অ্যাডমিনদের জন্য (Admin Route)
export const requireAdmin = createMiddleware(async (c, next) => {
  const auth = getAuth(c.env as any);

  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session || !session.user) {
    return c.json({ error: "Unauthorized access. Please login first." }, 401);
  }

  // Role চেক করা
  if (session.user.role !== "ADMIN") {
    return c.json({ error: "Forbidden. Admin access required." }, 403);
  }

  c.set("user", session.user);
  await next();
});
