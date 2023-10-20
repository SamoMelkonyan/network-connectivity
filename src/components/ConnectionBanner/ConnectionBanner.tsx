import React, { ForwardedRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import { isOnline as isNetworkOnline } from '../../utils';

const Banner = styled.div<{ $isOnline: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-size: 16px;
  padding: 4px;
  color: white;
  text-align: center;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  background-color: ${props => (props.$isOnline ? '#2E7D32' : '#D50000')};
  z-index: 9999;
`;

interface ConnectionBannerProps extends HTMLDivElement {
  hideOnlineBannerDelay?: number;
  alwaysShowBanner?: boolean;
  onlineBannerContent?: React.ReactElement | string;
  offlineBannerContent?: React.ReactElement | string;
  withPortal?: boolean;
}

export const ConnectionBanner = React.forwardRef(
  (
    props: ConnectionBannerProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const {
      hideOnlineBannerDelay = 2000,
      alwaysShowBanner = false,
      onlineBannerContent = 'Back online',
      offlineBannerContent = 'No connection',
      withPortal = true,
      className = '',
    } = props;

    const [isOnline, setIsOnline] = useState(isNetworkOnline());
    const [showBanner, setShowBanner] = useState(!isNetworkOnline());

    useEffect(() => {
      let timeoutId: number | null = null;

      const onlineListener = () => {
        setIsOnline(true);
        setShowBanner(true);

        timeoutId = setTimeout(() => {
          if (navigator.onLine) {
            setShowBanner(false);
          }
        }, hideOnlineBannerDelay);
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
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [hideOnlineBannerDelay]);

    if (!showBanner && !alwaysShowBanner) return <></>;

    const render = () => {
      return (
        <Banner
          $isOnline={isOnline}
          ref={ref}
          className={`connection-banner ${
            isOnline ? 'connection-banner-online' : 'connection-banner-offline'
          } ${className}`}
        >
          {isOnline ? onlineBannerContent : offlineBannerContent}
        </Banner>
      );
    };

    return withPortal ? createPortal(render(), document.body) : render();
  },
);
