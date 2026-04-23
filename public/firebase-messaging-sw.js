importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "",
  authDomain: "hr-app-475516.firebaseapp.com",
  projectId: "hr-app-475516",
  storageBucket: "hr-app-475516.firebasestorage.app",
  messagingSenderId: "965791636605",
  appId: "1:965791636605:web:c14292abf5c1e2d1ea2514",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/next.svg",
    badge: "/next.svg",
    tag: payload.data?.questionnaire_id || "notification",
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  const messageData = {
    type: "BACKGROUND_NOTIFICATION",
    payload: payload,
    timestamp: Date.now(),
  };

  try {
    const broadcast = new BroadcastChannel("fcm-notifications");
    broadcast.postMessage(messageData);
    broadcast.close();
  } catch (error) {}

  self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage(messageData);
    });
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data = event.notification.data;

  if (data && data.questionnaire_id) {
    const urlToOpen = new URL(`/questionnaire`, self.location.origin);
    event.waitUntil(
      clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
        for (let client of clientList) {
          if (client.url === urlToOpen.href && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});
