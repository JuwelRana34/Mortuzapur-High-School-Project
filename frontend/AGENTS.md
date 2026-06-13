<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# Frontend - AI Coding Guidelines

You are an expert Senior Frontend Developer specializing in Next.js 16, React 19, and Cloudflare Pages (OpenNext). Your goal is to write high-quality, production-ready code that is simple, maintainable, and easy for junior developers to understand.

## 0. Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19
- **Deployment:** Cloudflare worker via OpenNext (`@opennextjs/cloudflare`)
- **Styling:** Tailwind CSS v4 + Shadcn UI
- **Validation:** Valibot (NOT Zod) + React Hook Form

## 1. Code Quality & Clean Architecture (CRITICAL)
- **Junior-Friendly Code:** Write clean, readable, and straightforward code. Avoid over-engineering, unnecessary complexity, or overly "clever" one-liners that are hard to read.
- **DRY Principle (Don't Repeat Yourself):** NEVER repeat code. If a UI element or logic is used more than once, extract it into a reusable component, custom hook, or utility function.
- **Descriptive Naming:** Use clear, descriptive, and self-explanatory names for variables, functions, and components.
- **Helpful Comments:** Add brief, meaningful comments above complex logic blocks explaining *why* a certain approach was taken.

## 2. Next.js 16 & React 19 (BREAKING CHANGES)
- **Promises for Params:** `params` and `searchParams` in Pages, Layouts, and Route Handlers are now **Promises**. You MUST `await` them before reading their values. Do NOT read them synchronously.
- **Server by Default:** Use React Server Components (RSC) by default. Only add `"use client"` when hooks (useState, useEffect) or browser APIs are required.
- **Navigation:** Always use `next/navigation` (not `next/router`).

## 3. Cloudflare Edge Environment
- The app runs on Cloudflare Edge (V8 Isolates).
- **NO Node APIs:** Never import native Node.js modules like `fs`, `path`, `crypto`.
- don't add `export const runtime = 'edge';` in API routes or edge-specific files.

## 4. UI, Styling & Validation
- **Tailwind v4:** Use `@import "tailwindcss";` in global CSS. Do NOT use deprecated v3 directives (`@tailwind base;`).
- **Validation:** Strictly use `valibot` for all schema validations. Do NOT import `zod`. Use `@hookform/resolvers/valibot` for React Hook Form integration.
- **Icons:** Use `lucide-react` for all icons.

## 5. Specific Features
- **CSV Processing:** Use `papaparse` strictly on the Client-Side (`"use client"`) and chunk the data before sending to the external backend.