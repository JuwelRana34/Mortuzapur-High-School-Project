// "use server";

// import { getCloudflareContext } from "@opennextjs/cloudflare";
// import webpush from "web-push";

// export async function subscribeUser(sub: webpush.PushSubscription) {
//    const {env} = getCloudflareContext();

//   webpush.setVapidDetails(
//     "mailto:rk370613@gmail.com",
//     env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
//     env.VAPID_PRIVATE_KEY!,
//   );

//   let subscription: webpush.PushSubscription | null = null;

//   subscription = sub;
//   // In a production environment, you would want to store the subscription in a database
//   // For example: await db.subscriptions.create({ data: sub })
//   return { success: true };
// }

// export async function unsubscribeUser() {
//   subscription = null;
//   // In a production environment, you would want to remove the subscription from the database
//   // For example: await db.subscriptions.delete({ where: { ... } })
//   return { success: true };
// }

// export async function sendNotification(message: string) {
//   if (!subscription) {
//     throw new Error("No subscription available");
//   }

//   try {
//     await webpush.sendNotification(
//       subscription,
//       JSON.stringify({
//         title: "Test Notification",
//         body: message,
//         icon: "/icon.png",
//       }),
//     );
//     return { success: true };
//   } catch (error) {
//     console.error("Error sending push notification:", error);
//     return { success: false, error: "Failed to send notification" };
//   }
// }




"use server";
import webpush from "web-push";
import { Redis } from "@upstash/redis";
import { getCloudflareContext } from "@opennextjs/cloudflare/cloudflare-context";

// function getEnv() {
//   const { env } = getCloudflareContext();
//   return env;
// }

function getRedis() {
  let url: string;
  let token: string;

  try {
    const { env } = getCloudflareContext();
    url = env.UPSTASH_REDIS_REST_URL;
    token = env.UPSTASH_REDIS_REST_TOKEN;
  } catch {
    // Local dev fallback
    url = process.env.UPSTASH_REDIS_REST_URL!;
    token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  }

  if (!url || !token) {
    throw new Error("Redis credentials missing");
  }

  return new Redis({ url, token });
}

function setupWebPush() {
  let publicKey: string;
  let privateKey: string;

  try {
    const { env } = getCloudflareContext();
    publicKey = env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    privateKey = env.VAPID_PRIVATE_KEY;
  } catch {
    publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
    privateKey = process.env.VAPID_PRIVATE_KEY!;
  }

  if (!publicKey || !privateKey) {
    throw new Error("VAPID keys missing");
  }

  webpush.setVapidDetails("mailto:rk370613@gmail.com", publicKey, privateKey);
}

export async function subscribeUser(sub: webpush.PushSubscription) {
  setupWebPush();
  const redis = getRedis();
  await redis.set("push_subscription", JSON.stringify(sub));
  return { success: true };
}

export async function unsubscribeUser() {
  const redis = getRedis();
  await redis.del("push_subscription");
  return { success: true };
}

export async function sendNotification(message: string) {
  setupWebPush();
  const redis = getRedis();

  const subData = await redis.get<string>("push_subscription");
  if (!subData) {
    throw new Error("No subscription available");
  }

  const subscription =
    typeof subData === "string" ? JSON.parse(subData) : subData;

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "../icon-192x192.png",
      }),
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}