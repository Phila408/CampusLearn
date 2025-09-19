

import { useEffect } from "react";

export default function Toast({ type="info", message, onClose, duration=2500 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  const styles = {
    info:   "bg-blue-600",
    success:"bg-green-600",
    error:  "bg-red-600",
    warn:   "bg-yellow-600 text-gray-900",
  }[type] || "bg-gray-800";

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-white px-4 py-2 rounded-xl shadow-xl ${styles}`}>
      {message}
    </div>
  );
}
