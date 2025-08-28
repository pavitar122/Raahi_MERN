importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDgGxxyVE2p-K2dEz5uhswJBq0pbNEbp7Y",
  authDomain: "push-notifications-976b3.firebaseapp.com",
  projectId: "push-notifications-976b3",
  storageBucket: "push-notifications-976b3.appspot.com",
  messagingSenderId: "274578021278",
  appId: "1:274578021278:web:6a4600785f010018d2548f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || 'Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'No content available',
    icon: payload.notification?.image || '/default-icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
