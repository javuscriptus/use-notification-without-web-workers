import { useCallback, useEffect, useState, startTransition } from "react";

const NotificationPermissionStatus = {
  DEFAULT: "Default",
  GRANTED: "Allowed",
  DENIED: "Denied"
};

const isNotificationSupported = (): boolean => {
  return "Notification" in window && "permissions" in navigator;
};

const useNotification = (
  title?: string,
  options?: NotificationOptions
): [
  ((title: string, options: NotificationOptions) => void) | undefined,
  string
] => {
  const [permissionStatus, setPermissionStatus] = useState<string>(
    Notification.permission
  );

  const fireNotify = useCallback(
    (localTitle: string, localOptions: NotificationOptions) => {
      const handlePermission = (permission: string) => {
        if (permission === "granted") {
          new Notification(localTitle || title || "", localOptions || options);
        } else {
          console.error("No access to browser notifications");
        }
      };

      if (!isNotificationSupported()) {
        console.error("Notifications are not supported in this browser");
        return;
      }

      if (Notification.permission === "granted") {
        new Notification(localTitle || title || "", localOptions || options);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission()
          .then(handlePermission)
          .catch((error: Error) => {
            console.error(
              "Error while requesting notification permission:",
              error
            );
          });
      }
    },
    [title, options]
  );

  useEffect(() => {
    if (!isNotificationSupported()) {
      console.error("Notifications are not supported in this browser");
      return;
    }

    const handlePermissionChange = (permission: string) => {
      startTransition(() => {
        setPermissionStatus(permission);
      });
    };

    Notification.requestPermission()
      .then(handlePermissionChange)
      .catch((error: Error) => {
        console.error("Error while requesting notification permission:", error);
      });
  }, []);

  const permissionStatusText =
    permissionStatus === "default"
      ? NotificationPermissionStatus.DEFAULT
      : permissionStatus === "granted"
      ? NotificationPermissionStatus.GRANTED
      : NotificationPermissionStatus.DENIED;

  return [fireNotify, permissionStatusText];
};

export default useNotification;
