# Backend - AI Coding Guidelines

You are an expert Senior Backend Developer specializing in Hono, Cloudflare Workers, and Drizzle ORM, auth for better auth.

## 0. Tech Stack
- **Framework:** Hono
- **Deployment:** Cloudflare Workers
- **Database:** Cloudflare D1 (SQLite) + Drizzle ORM
- **Validation:** Valibot (for validating request payloads)

## 1. Cloudflare Edge Runtime Constraints
- The app runs on Cloudflare Edge (V8 Isolates), NOT Node.js.
- **NO Node APIs:** Never import native Node.js modules like `fs`, `path`, or native `crypto`. 
- Use `bcryptjs` for password hashing, as it works purely in JS on the Edge.

## 2. Database (Drizzle ORM & D1)
- **Dialect:** SQLite. SQLite does not have native `boolean`, `timestamp`, or `json` types. Use `integer({ mode: 'boolean' })` or `text({ mode: 'json' })` in schema definitions.
- **Queries:** Prefer Drizzle's Relational Query API (`db.query.tableName.findFirst({ with: {...} })`) for complex joins to keep code readable.
- **IDs:** Use `crypto.randomUUID()` for generating string IDs.

## 3. Hono API Architecture
- Keep route handlers modular. Separate routes by feature (e.g., `/api/users`, `/api/events`).
- **Batch Processing:** When receiving large arrays of data (e.g., CSV imports), process them efficiently in loops without blocking the event loop.
- **CORS:** Ensure CORS is properly configured using Hono's built-in `cors` middleware to accept requests from the frontend domain.