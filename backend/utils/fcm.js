import fetch from "node-fetch";

const serverKey = process.env.FCM_SERVER_KEY; // Store in .env

export const sendNotification = async (token, title, body) => {
  await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      "Authorization": `key=${serverKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      notification: { title, body },
      to: token,
    }),
  });
};
