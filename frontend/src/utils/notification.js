import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";
import axios from "axios";

// Request user permission and get FCM token
export const requestForToken = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });
        if (token) {
            console.log("FCM Token:", token);
            const data = { token };
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/saveToken`,
                    data
                );
                if (response.status === 200) {
                    const data = response.data;
                    localStorage.setItem("token", data.token);
                    console.log("Token saved in database.")
                }
            } catch (error) {
                console.error(error.message);
            }

        } else {
            console.log("No registration token available. Request permission.");
        }
    } catch (err) {
        console.error("An error occurred while retrieving token. ", err);
    }
};

// Listen for foreground messages
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
