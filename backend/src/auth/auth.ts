import { Hono } from "hono";
import { getAuth } from "../auth";
import type { Env } from "../index";

const authRoutes = new Hono<Env>();

authRoutes.on(["POST", "GET"], "/*", (c) => {
  const auth = getAuth(c.env);
  return auth.handler(c.req.raw);
});

export default authRoutes;
