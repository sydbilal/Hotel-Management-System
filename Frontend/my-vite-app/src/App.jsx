import "./App.css";
import Homepage from "./Pages/Homepage";
import RoomDetails from "./Components/RoomDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";

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



      </Routes>
    </BrowserRouter>
  );
}

export default App;
