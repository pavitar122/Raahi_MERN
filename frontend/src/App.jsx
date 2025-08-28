import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Start from './pages/Start'
import LoginUser from "./pages/LoginUser"
import RegisterUser from './pages/RegisterUser'
import Home from './pages/Home'
import { generateToken, messaging } from './notifications/firebase'
import { getMessaging, onMessage } from "firebase/messaging";



const App = () => {

  useEffect(() => {
    // generateToken();
    // onMessage(messaging, (payload) => {
    //   console.log(payload, "message recieved");
    // })
    onMessage(messaging, (payload) => {
      console.log("Foreground notification:", payload);

      // Option 1: Show native phone notification
      if (Notification.permission === "granted") {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: payload.notification.image || "/default-icon.png",
        });
      }

      // Option 2: Show custom in-app alert
      // alert(`${payload.notification.title}: ${payload.notification.body}`);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/loginUser" element={<LoginUser />} />
      <Route path="/registerUser" element={<RegisterUser />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App