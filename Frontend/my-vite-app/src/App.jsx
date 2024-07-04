import "./App.css";
import Homepage from "./Pages/Homepage";
import RoomDetails from "./Components/RoomDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import AdminPage from "./Pages/AdminPage";
// import ProtectedRoute from "./Components/ProtectedRoute";
// import AdminLoginPage from "./Pages/AdminLoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/room/:roomNumber" element={<RoomDetails />} />
        <Route path="/aboutus" element={<About/>} />
        <Route path="/contactus" element={<Contact/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admin" element={<AdminPage/>} />
        {/* <Route path="/adminlogin" element={<AdminLoginPage/>} /> */}
        {/* <Route element={<ProtectedRoute requiredRole={['admin', 'superadmin']} />}/> */}




      </Routes>
    </BrowserRouter>
  );
}

export default App;
