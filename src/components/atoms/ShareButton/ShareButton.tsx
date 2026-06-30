"use client";

import { useCallback, useState } from "react";

import styles from "./ShareButton.module.css";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(globalThis.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <button
      type="button"
      className={styles.shareButton}
      onClick={handleShare}
      aria-label="Share link"
    >
      <span role="status">{copied ? "Copied!" : "Share"}</span>
    </button>
  );
};

export default ShareButton;
