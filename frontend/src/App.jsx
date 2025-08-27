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
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload, "message recieved");
    })
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