"use client";

import { createAuthClient } from "better-auth/react";

import { getAuthUrl } from "./env";

export const authClient = createAuthClient({
  baseURL: getAuthUrl(),
  fetchOptions: {
    credentials: "include",
  },
});

// export type AuthClient = typeof authClient;

export const { signIn, signUp, useSession } = authClient;
