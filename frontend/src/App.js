import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScannerPage from "./components/scannerpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScannerPage />} />
        <Route path="/scan" element={<ScannerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
