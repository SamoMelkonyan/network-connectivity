import { useEffect, useState } from 'react';
import { isOnline as isNetworkOnline } from '../utils';

export const useConnection = (): { isOnline: boolean } => {
  const [isOnline, setIsOnline] = useState(isNetworkOnline());

  useEffect(() => {
    const onlineListener = () => setIsOnline(true);

    const offlineListener = () => setIsOnline(false);

    window.addEventListener('online', onlineListener);
    window.addEventListener('offline', offlineListener);

    return () => {
      window.removeEventListener('online', onlineListener);
      window.removeEventListener('offline', offlineListener);
    };
  });

  return {
    isOnline,
  };
};
