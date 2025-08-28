import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import webpush from "web-push";

const PORT = process.env.PORT || 5000;

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log('VAPID keys not found. Generating new keys...');
  const vapidKeys = webpush.generateVAPIDKeys();
  console.log('Add these to your .env file:');
  console.log(`VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`);
  console.log(`VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`);
  console.log('VAPID_MAILTO=mailto:your-email@example.com');
  console.log('Please add the VAPID keys to your .env file and restart the server.');
  process.exit(1); // Optional: exit if keys are missing
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});