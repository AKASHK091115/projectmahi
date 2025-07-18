import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScannerPage from "./components/scannerpage";
import RegisterPage from "./auth/register";
import LoginPage from "./auth/login";
import ProfilePage from "./auth/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/scan" element={<ScannerPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
