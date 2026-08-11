import { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      setDeferredPrompt(event);
      setShowPrompt(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt,
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-md rounded-xl border bg-background p-4 shadow-2xl">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h2 className="text-sm font-semibold">
            Install Job Tracker
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Install Job Tracker SaaS for quick access and a better
            app-like experience.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="text-lg leading-none text-muted-foreground hover:text-foreground"
          aria-label="Dismiss install prompt"
        >
          ×
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleInstall}
          className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Install App
        </button>

        <button
          type="button"
          onClick={handleDismiss}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Not now
        </button>
      </div>
    </div>
  );
}