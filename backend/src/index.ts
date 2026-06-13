import { Hono } from "hono";
import { cors } from "hono/cors";
import authRoutes from "./auth/auth";
import userRoutes from "./routes/usre";


// মিডলওয়্যার ইম্পোর্ট করুন

export type Env = {
  Bindings: {
    DB: D1Database;
    FEST_KV: KVNamespace;
    BETTER_AUTH_SECRET: string;
    NODE_ENV: string;
    SSL_STORE_ID: string;
    SSL_STORE_PASSWORD: string;
    SSL_IS_SANDBOX: string; // "true" or "false"
    APP_BASE_URL: string;
    FRONTEND_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    COOKIE_DOMAIN: string; // নতুন ভ্যারিয়েবল
  };
  // 👇 Context এ ইউজার সেভ করার জন্য Type ডিক্লেয়ার 👇
  Variables: {
    user: any;
  };
};


const app = new Hono<Env>();

app.use("/*", async (c, next) => {
  const corsMiddleware = cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8788",
      "https://jnu-it-fest.rk370613.workers.dev",
      c.env.FRONTEND_URL, // ✅ env থেকে dynamic
    ],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    allowMethods: ["POST", "GET", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
    exposeHeaders: ["Set-Cookie"],
  });
  return corsMiddleware(c, next);
});

app.get("/", (c) => {
  return c.json({ message: "Welcome to National Fest API Backend!" });
});

// Auth রাউটগুলো আনপ্রোটেক্টেড থাকবে
app.route("/api/auth", authRoutes);
app.route("/api/user", userRoutes);
// ==========================================
// 🛡️ Protected Routes Example
// ==========================================

// ১. এই রাউটে যে কেউ যেতে পারবে (পাবলিক)
app.get("/api/public-events", (c) => {
  return c.json({ message: "Anyone can see this." });
});

// ২. শুধুমাত্র লগইন করা ইউজাররা (স্টুডেন্ট/অ্যাডমিন সবাই) এক্সেস পাবে



// ==========================================
// 🔐 Admin Routes (Protected with requireAdmin)
// ==========================================

export default app;
