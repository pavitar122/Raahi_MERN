// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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


const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: "YOUR_VAPID_KEY_FROM_FIREBASE_CLOUD_MESSAGING",
        });
        console.log("FCM Token:", token);
        // Send this token to your backend to save it for sending notifications later
    } catch (error) {
        console.error("Permission denied or error:", error);
    }
};

export const onForegroundMessage = () => {
    onMessage(messaging, (payload) => {
        console.log("Message received in foreground:", payload);
        alert(payload.notification.title);
    });
};
