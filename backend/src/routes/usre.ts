import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { sendSuccess } from "../../lib/response";
import type { Env } from "../index";
import { requireAuth } from "../middleware/authMiddleware";

const userRoutes = new Hono<Env>();

// ==========================================
// 🚀 Get User Dashboard Data (Single API)
// ==========================================
userRoutes.get("/dashboard", requireAuth, async (c) => {
  const db = drizzle(c.env.DB);
  const userId = c.req.param("userId");

  return sendSuccess(c, "User dashboard data fetched successfully", [{id: userId }]);
});

export default userRoutes;
