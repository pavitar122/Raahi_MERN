// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgGxxyVE2p-K2dEz5uhswJBq0pbNEbp7Y",
  authDomain: "push-notifications-976b3.firebaseapp.com",
  projectId: "push-notifications-976b3",
  storageBucket: "push-notifications-976b3.firebasestorage.app",
  messagingSenderId: "274578021278",
  appId: "1:274578021278:web:6a4600785f010018d2548f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);