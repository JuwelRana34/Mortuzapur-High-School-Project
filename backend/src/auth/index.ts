import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import type { Env } from "../index";

export const getAuth = (env: Env["Bindings"]) => {
  const db = drizzle(env.DB, { schema });

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
    }),
    secret: env.BETTER_AUTH_SECRET,

    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "USER",
        },
       
      },
    },

    // ✅ শুধু origin, path দেবে না
    baseURL: env.APP_BASE_URL,

    trustedOrigins: [
      "http://localhost:3000",
      "http://localhost:8788",
      env.FRONTEND_URL,
      "https://itfest.jnuits.org.bd",
    ],

    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        redirectURI: `${env.APP_BASE_URL}/api/auth/callback/google`,
      },
    },

    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },

    advanced: {
      cookiePrefix: "better-auth",
      crossSubDomainCookies: {
        enabled: true,
      },

      defaultCookieAttributes: {
        sameSite: "lax",
        secure: env.NODE_ENV === "production" ? true : false,
        httpOnly: env.NODE_ENV === "production" ? true : false,
        domain: env.COOKIE_DOMAIN,
      },
    },
  });
};
