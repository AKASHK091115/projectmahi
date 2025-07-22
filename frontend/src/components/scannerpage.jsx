import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

const ScannerPage = () => {
  const [scanResult, setScanResult] = useState(null);
  const [userId] = useState("u123");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      async (decodedText, decodedResult) => {
        try {
          const res = await axios.post("http://localhost:3000/ar/scan-product", {
            markerId: decodedText,
            userId,
          });
          setScanResult(res.data);
          scanner.clear(); // stop scanning after first read
        } catch (err) {
          console.error("Scan failed:", err);
          alert("Scan failed.");
        }
      },
      (error) => {
        console.warn("QR error:", error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, [userId]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Scan a Product QR Code</h1>
      {!scanResult && (
  <>
    <div id="reader" style={{ width: "300px", margin: "auto" }} />

    <button
      onClick={async () => {
        try {
          const res = await axios.post("http://localhost:3000/ar/scan-product", {
            markerId: "marker101", // 🔥 test data
            userId,
          });
          setScanResult(res.data);
        } catch (err) {
          console.error("Simulated scan failed:", err);
          alert("Simulated scan failed.");
        }
      }}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Simulate QR Scan (marker101)
    </button>
  </>
)}

      {scanResult && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Scanned Product:</h3>
          <p><strong>Name:</strong> {scanResult.product.name}</p>
          <p><strong>Price:</strong> ₹{scanResult.product.price}</p>
          <p><strong>Marker:</strong> {scanResult.product.markerCode}</p>
        </div>
      )}
    </div>
  );
};

export default ScannerPage;
