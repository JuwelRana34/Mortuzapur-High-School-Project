export function getAuthUrl() {
  const authUrl =
    process.env.NODE_ENV === "production"
      ? "http://localhost:8787"
      : "http://localhost:8787";

  if (!authUrl) {
    throw new Error(
      `Auth URL is missing. Set it to your Better Auth backend URL before using the auth client.`,
    );
  }

  return authUrl;
}
