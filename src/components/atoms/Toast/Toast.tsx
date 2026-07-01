"use client";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

import type { Toast } from "@/types/notifications";

import styles from "./Toast.module.css";

type ToastProps = {
  toast: Toast;
  onClose: (id: string) => void;
};

const DISMISS_MS: Record<string, number> = {
  error: 5000,
  warning: 4000,
};

const ToastAtom = ({ toast, onClose }: ToastProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const ms = DISMISS_MS[toast.type] ?? 5000;
    timerRef.current = setTimeout(() => onClose(toast.id), ms);
    return () => clearTimeout(timerRef.current);
  }, [toast.id, toast.type, onClose]);

  return (
    <div
      className={styles.toast}
      data-type={toast.type}
      role="alert"
      aria-live="assertive"
    >
      <span className={styles.message}>{toast.message}</span>
      <button
        className={styles.close}
        onClick={() => onClose(toast.id)}
        aria-label="Close notification"
        type="button"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

export default ToastAtom;
