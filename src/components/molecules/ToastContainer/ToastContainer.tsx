"use client";
import ToastAtom from "@/components/atoms/Toast/Toast";
import { useNotificationStore } from "@/store/notification-store";

import styles from "./ToastContainer.module.css";

const ToastContainer = () => {
  const toasts = useNotificationStore((s) => s.toasts);
  const removeToast = useNotificationStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} aria-label="Notifications">
      {toasts.map((t) => (
        <ToastAtom key={t.id} toast={t} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
