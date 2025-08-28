importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDgGxxyVE2p-K2dEz5uhswJBq0pbNEbp7Y",
  authDomain: "push-notifications-976b3.firebaseapp.com",
  projectId: "push-notifications-976b3",
  storageBucket: "push-notifications-976b3.firebasestorage.app",
  messagingSenderId: "274578021278",
  appId: "1:274578021278:web:6a4600785f010018d2548f"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/logo192.png'
  });
});