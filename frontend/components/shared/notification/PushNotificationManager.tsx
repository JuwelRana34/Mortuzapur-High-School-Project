// "use client";
// import { useEffect, useState } from "react";
// import { UrlBase64ToUint8Array } from "./PushNotification";
// import { sendNotification, subscribeUser, unsubscribeUser } from "@/actions/action";

// export function PushNotificationManager() {
//   const [isSupported, setIsSupported] = useState(false);
//   const [subscription, setSubscription] = useState<PushSubscription | null>(
//     null,
//   );
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if ("serviceWorker" in navigator && "PushManager" in window) {
//       setIsSupported(true);
//       registerServiceWorker();
//     }
//   }, []);

//   async function registerServiceWorker() {
//     const registration = await navigator.serviceWorker.register("/sw.js", {
//       scope: "/",
//       updateViaCache: "none",
//     });
//     const sub = await registration.pushManager.getSubscription();
//     setSubscription(sub);
//   }

//   async function subscribeToPush() {
//     const registration = await navigator.serviceWorker.ready;
//     const sub = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: UrlBase64ToUint8Array(
//         process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
//       ),
//     });
//     setSubscription(sub);
//     const serializedSub = JSON.parse(JSON.stringify(sub));
//     await subscribeUser(serializedSub);
//   }

//   async function unsubscribeFromPush() {
//     await subscription?.unsubscribe();
//     setSubscription(null);
//     await unsubscribeUser();
//   }

//   async function sendTestNotification() {
//     if (subscription) {
//       await sendNotification(message);
//       setMessage("");
//     }
//   }

//   if (!isSupported) {
//     return <p>Push notifications are not supported in this browser.</p>;
//   }

//   return (
//     <div>
//       <h3>Push Notifications</h3>
//       {subscription ? (
//         <>
//           <p>You are subscribed to push notifications.</p>
//           <button onClick={unsubscribeFromPush}>Unsubscribe</button>
//           <input
//             type="text"
//             placeholder="Enter notification message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button onClick={sendTestNotification}>Send Test</button>
//         </>
//       ) : (
//         <>
//           <p>You are not subscribed to push notifications.</p>
//           <button onClick={subscribeToPush}>Subscribe</button>
//         </>
//       )}
//     </div>
//   );
// }







"use client";
import { useEffect, useState } from "react";
import { UrlBase64ToUint8Array } from "./PushNotification";
import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from "@/actions/action";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");
  // API Call er somoy button disable korar jonno loading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 1. Function-tike useEffect-er vetore niye asha holo
    async function registerServiceWorker() {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    }

    // 2. Ebar timer-er vetor theke call korle kono error asbe na
    const timer = setTimeout(() => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        setIsSupported(true);
        registerServiceWorker(); // Ekhon function-ti uporei declared ache
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []); // Dependencies faka thakbe karon sob logic vetore

  // Niche theke purono registerServiceWorker() function-ti delete kore diben!

  //   async function registerServiceWorker() {
  //     try {
  //       const registration = await navigator.serviceWorker.register("/sw.js", {
  //         scope: "/",
  //         updateViaCache: "none",
  //       });
  //       const sub = await registration.pushManager.getSubscription();
  //       setSubscription(sub);
  //     } catch (error) {
  //       console.error("Service Worker registration failed:", error);
  //     }
  //   }

  async function subscribeToPush() {
    setIsLoading(true);
    const { env } = getCloudflareContext();
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: UrlBase64ToUint8Array(
          env.VAPID_PUBLIC_KEY!,
        ),
      });
      setSubscription(sub);

      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser(serializedSub);
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function unsubscribeFromPush() {
    setIsLoading(true);
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
    } catch (error) {
      console.error("Unsubscribe failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function sendTestNotification() {
    // Message faka thakle jate request na jay
    if (subscription && message.trim()) {
      setIsLoading(true);
      try {
        await sendNotification(message);
        setMessage("");
      } catch (error) {
        console.error("Failed to send notification:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  if (!isSupported) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-xl dark:bg-red-900/10 dark:border-red-900/50 dark:text-red-400">
        <p className="text-sm font-medium">
          Push notifications are not supported in this browser.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        🔔 Push Notifications
      </h3>

      {subscription ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400 p-3 rounded-lg border border-green-200 dark:border-green-800/30">
            <p className="text-sm font-medium">
              ✅ Subscribed to notifications
            </p>
            <button
             type="button"
              onClick={unsubscribeFromPush}
              disabled={isLoading}
              className="text-sm px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Wait..." : "Unsubscribe"}
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Enter notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-zinc-900 dark:text-zinc-100"
            />
            <button
              onClick={sendTestNotification}
              disabled={isLoading || !message.trim()}
              className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Test"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Stay updated with our latest alerts.
          </p>
          <button
            onClick={subscribeToPush}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Subscribing..." : "Subscribe Now"}
          </button>
        </div>
      )}
    </div>
  );
}
