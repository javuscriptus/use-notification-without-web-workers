## useNotification Hook

The `useNotification` hook is a custom React hook that provides a simple way to request and manage browser notifications in a React application.

## Usage

Here's an example of how you can use the `useNotification` hook in your React component:

```
import React from "react";
import useNotification from "use-notification-hook";

const MyComponent = () => {
  const [notify, permissionStatus, requestPermission] = useNotification();

  const handleClick = () => {
    notify("Hello!", { body: "This is a notification." });
  };

  return (
    <div>
      <button onClick={handleClick}>Notify</button>
      <p>Permission status: {permissionStatus}</p>
      {permissionStatus === "Default" && (
        <button onClick={requestPermission}>Request Permission</button>
      )}
    </div>
  );
};

export default MyComponent;
```

## API

The `useNotification` hook returns an array with three elements:

- `notify(title: string, options?: NotificationOptions)`: A function that can be called to display a browser notification. It takes a title as a string and an optional options object that can contain additional configuration for the notification.

- `permissionStatus`: A string representing the current permission status for browser notifications. Possible values are:

  - `"Default"`: The user has not yet granted or denied permission for notifications.
  - `"Allowed"`: The user has granted permission for notifications.
  - `"Denied"`: The user has denied permission for notifications.

- `requestPermission()`: A function that can be called to request permission for browser notifications. This function should be called in response to user interaction, such as a button click.

## Notes

- The `useNotification` hook internally checks if the browser supports notifications using the `isNotificationSupported` function.
- The hook handles permission status updates automatically and provides the `permissionStatus` value to track the current permission status.
- The hook uses the `Notification.requestPermission` method to request permission for notifications from the user.
- The `notify` function can be called at any time to display a browser notification with the provided `title` and `options`.
- The `requestPermission` function can be used to request permission explicitly, typically in response to user actions.

## Compatibility

The `useNotification` hook relies on the `Notification` API and the `navigator.permissions` API, which are supported in most modern web browsers. However, it's recommended to check the browser compatibility of these APIs before using this hook in a production environment.

## License

This project is licensed under the MIT License.


