import React, { useEffect, useState } from 'react';
import './style.scss';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ConnectionBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBanner, setShowBanner] = useState(!navigator.onLine);

  useEffect(() => {
    const onlineListener = () => {
      setIsOnline(true);
      setShowBanner(true);

      setTimeout(() => {
        if (navigator.onLine) {
          setShowBanner(false);
        }
      }, 2000);
    };

    const offlineListener = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener('online', onlineListener);
    window.addEventListener('offline', offlineListener);

    return () => {
      window.removeEventListener('online', onlineListener);
      window.removeEventListener('offline', offlineListener);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <div
      className={`Connection-Banner ${
        isOnline ? 'Connection-Banner-Online' : 'Connection-Banner-Offline'
      }`}
    >
      {isOnline
        ? 'Network connection is back online'
        : 'Network connection is offline'}
    </div>
  );
};
