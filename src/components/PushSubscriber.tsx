import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { subscribeUserWeb } from "../utils/notification";

const PushSubscriber: React.FC = () => {
  const { token } = useAuthStore();

  const webSubscribe = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    await subscribeUserWeb();
  };

  useEffect(() => {
    const initPush = async () => {
      if (!token) return;

      await webSubscribe();
    };

    initPush();
  }, [token]);

  return null;
};

export default PushSubscriber;
