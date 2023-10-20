# Network Connectivity

[![npm version](https://img.shields.io/npm/v/network-connectivity.svg)](https://www.npmjs.com/package/network-connectivity)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/SamoMelkonyan/network-connectivity/blob/master/LICENSE)

> A lightweight package for detecting and monitoring network connectivity in web applications.

## Getting Started

### Install the package:

Using npm:

```
$ npm install --save network-connectivity
```

Using Yarn:

```
$ yarn add network-connectivity
```

## API Reference


## `ConnectionBanner` Component

The `ConnectionBanner` component is designed to display online and offline status banners with customizable content. It accepts the following props:

### Props

| Prop Name             | Type                                  | Default Value    | Description                                                                                   |
| --------------------- | ------------------------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| `hideOnlineBannerDelay` | `number`                        | `2000`            | The delay in milliseconds before hiding the online banner after a successful connection is detected. |
| `alwaysShowBanner`    | `boolean`                       | `false`           | If set to `true`, the banner will always be displayed, regardless of the online/offline status.      |
| `onlineBannerContent` | `React.ReactElement` or `string` | `'Back online'`   | The content to display in the online status banner. It can be a React element or a string.           |
| `offlineBannerContent` | `React.ReactElement` or `string` | `'No connection'` | The content to display in the offline status banner. It can be a React element or a string.          |
| `withPortal`          | `boolean`                           | `true`            | If set to `true`, the `ConnectionBanner` will use a portal to render the banner.                  |
| `className`           | `string`                            |                   | Additional CSS class names to apply to the `ConnectionBanner` component.                         |

### CSS Class Names

The `ConnectionBanner` component supports custom styling through CSS class names. You can use the `className` prop to apply additional class names to the component. The component itself applies the following class names:

- `connection-banner`: The base class name for the `ConnectionBanner` component.
- `connection-banner-online`: Applied when the device is online.
- `connection-banner-offline`: Applied when the device is offline.

### Example Usage

Here's an example of how you can use the `ConnectionBanner` component with some custom props:

```jsx
import { ConnectionBanner } from 'network-connectivity';

const MyComponent = () => {
  return (
    <div>
      <ConnectionBanner />
    </div>
  )
}
```

## `useConnection` Hook

The `useConnection` hook allows you to access the network connectivity status within your React components. It returns an object with the following properties:

- `isOnline`: A boolean value indicating whether the device is currently online.

### Example Usage

```jsx
import { useConnection } from 'network-connectivity';

const MyComponent = () => {
  const { isOnline } = useConnection();

  return (
    <div>
      <p>Is online: {isOnline ? 'Yes' : 'No'}</p>
    </div>
  );
}
```


## `isOnline` Function

The `isOnline` function is a utility function provided by the `network-connectivity` package. It allows you to programmatically check the network connectivity status.

### Example Usage

```jsx
import { isOnline } from 'network-connectivity';

if (isOnline()) {
  console.log('You are online!');
} else {
  console.log('You are offline.');
}
```
