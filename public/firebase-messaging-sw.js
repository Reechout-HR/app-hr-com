importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

/**
 * Initialize Firebase in the service worker.
 * Note: These values should be injected during build or via a dynamic service worker route.
 * Do NOT hardcode production secrets here.
 */
firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/next.svg",
    badge: "/next.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
