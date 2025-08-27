import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start'
import LoginUser from "./pages/LoginUser"
import RegisterUser from './pages/RegisterUser'
import Home from './pages/Home'
import { requestNotificationPermission, onForegroundMessage } from "./firebase";

function App() {
  useEffect(() => {
    requestNotificationPermission();
    onForegroundMessage();
  }, []);
}


const App = () => {
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