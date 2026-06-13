```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

The Worker expects these bindings and variables during local development and deployment:

```txt
DB               D1 database binding
AUTH_URL         Public auth backend URL, for example http://localhost:8787
FRONTEND_ORIGIN  Frontend origin allowed to call the auth backend
AUTH_SECRET      Better Auth secret used to sign cookies and tokens
```

If you are deploying to Cloudflare, create the D1 database first, then fill in the D1 `database_id` in `wrangler.jsonc` and move `AUTH_SECRET` to a secret before production use.

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```
