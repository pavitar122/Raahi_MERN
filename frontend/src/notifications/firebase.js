import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyDgGxxyVE2p-K2dEz5uhswJBq0pbNEbp7Y",
    authDomain: "push-notifications-976b3.firebaseapp.com",
    projectId: "push-notifications-976b3",
    storageBucket: "push-notifications-976b3.appspot.com",
    messagingSenderId: "274578021278",
    appId: "1:274578021278:web:6a4600785f010018d2548f"
};


const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
        })
        console.log(token);
        localStorage.setItem("fcmToken", token);
        return token;
    }
}