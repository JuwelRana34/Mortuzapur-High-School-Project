


"use client";
import { useEffect, useState } from "react";
import { PushNotificationManager } from "./PushNotificationManager";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

function InstallPrompt() {
  const [clientData, setClientData] = useState({
    isMounted: false,
    isIOS: false,
    isStandalone: true,
  });
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // MSStream bypass soriye shudhu modern Apple device check kora holo
      // Sathe modern iPad (ja Mac hisebe show kore) tar jonno maxTouchPoints add kore diyechi
      const checkIsIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      setClientData({
        isMounted: true,
        isIOS: checkIsIOS,
        isStandalone: window.matchMedia("(display-mode: standalone)").matches,
      });
    }, 0);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timer);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  if (!clientData.isMounted || clientData.isStandalone) {
    return null;
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="mt-6 p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
        📱 App Install Korun
      </h3>

      {clientData.isIOS ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          To install this app on your iOS device, tap the share button
          <span className="mx-1 inline-flex items-center justify-center p-1 bg-zinc-200 dark:bg-zinc-800 rounded">
            ⎋
          </span>
          and then{" "}
          <strong className="font-medium">
            &quot;Add to Home Screen&quot;
          </strong>
          <span className="mx-1 inline-flex items-center justify-center p-1 bg-zinc-200 dark:bg-zinc-800 rounded">
            ➕
          </span>
          .
        </p>
      ) : (
        <button
          type="button"
          onClick={handleInstallClick}
          disabled={!deferredPrompt}
          className="w-full sm:w-auto px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Home Screen
        </button>
      )}
    </div>
  );
}

export default function Notification() {
  return (
    <div className="max-w-md mx-auto p-4 md:p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Notification Settings
        </h2>
        <p className="text-zinc-500 mt-2 text-sm">
          Manage your web push notifications and app installation.
        </p>
      </div>

      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}