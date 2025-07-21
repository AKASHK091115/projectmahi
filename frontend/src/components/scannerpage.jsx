import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ScannerPage = () => {
  const [searchParams] = useSearchParams();
  const [markerId, setMarkerId] = useState("");
  const [userId] = useState("u123");
  const [scanResult, setScanResult] = useState(null);

  // ✅ useCallback to avoid missing dependency warning
  const handleScan = useCallback(async (marker) => {
    if (!marker) return;
    try {
      const response = await axios.post("https://tx475zwk-3000.inc1.devtunnels.ms/ar/scan-product", {
        markerId: marker,
        userId,
      });
      setScanResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Scan failed.");
    }
  }, [userId]);

  useEffect(() => {
    const marker = searchParams.get("markerId");
    if (marker) {
      setMarkerId(marker);
      handleScan(marker); // ✅ now reliably triggers
    }
  }, [searchParams, handleScan]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Scan the QR</h1>

      {markerId ? (
        <>
          <img
            src={`https://tx475zwk-3000.inc1.devtunnels.ms/qr?markerId=${markerId}`}
            alt={`QR Code for ${markerId}`}
            style={{ width: "200px", margin: "20px" }}
          />
          <p><strong>Marker ID:</strong> {markerId}</p>
        </>
      ) : (
        <p>Loading QR...</p>
      )}

      <button onClick={() => handleScan(markerId)}>Simulate Scan</button>

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
