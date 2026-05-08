import { useEffect, useState } from "react";

function Toast({ message, show }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let showTimer;
    let hideTimer;

    if (show) {
      showTimer = setTimeout(() => setVisible(true), 0);
      hideTimer = setTimeout(() => setVisible(false), 3000);
    } else {
      showTimer = setTimeout(() => setVisible(false), 0);
    }

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-violet-600 text-white px-6 py-3 rounded-2xl shadow-lg text-sm font-medium animate-pulse">
      {message}
    </div>
  );
}

export default Toast;