import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Start from "./pages/Start";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import Home from "./pages/Home";
import { requestForToken, onMessageListener } from "./utils/notification";

const App = () => {
  useEffect(() => {
    // Request FCM token
    requestForToken();

    // Listen for foreground notifications
    const listen = async () => {
      try {
        const payload = await onMessageListener();
        console.log("Foreground Notification:", payload);
        alert(`Notification: ${payload.notification.title}`);
      } catch (err) {
        console.error("Notification listener failed: ", err);
      }
    };

    listen();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/loginUser" element={<LoginUser />} />
      <Route path="/registerUser" element={<RegisterUser />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
