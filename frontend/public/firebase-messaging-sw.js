importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDV49EwzG7IyBpYs0sDkied8KtUHKEwWoc",
  authDomain: "sawari-c6045.firebaseapp.com",
  projectId: "sawari-c6045",
  storageBucket: "sawari-c6045.firebasestorage.app",
  messagingSenderId: "698078845187",
  appId: "1:698078845187:web:9753b7192d179a31ce3136",
  measurementId: "G-WWL77FV57Y"
};


const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
