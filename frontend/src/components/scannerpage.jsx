import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom"; // 👈 for navigation

const ScannerPage = () => {
  const [scanResult, setScanResult] = useState(null);
  const [userId] = useState("u123");
  const navigate= useNavigate()
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
          scanner.clear();
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

  const handleAddToCart = async () => {
    if (scanResult && scanResult.product) {
      try {
        await axios.post("http://localhost:3000/cart/addBlock", {
          userId: userId,
          productId: scanResult.product.markerCode, // or .id if you have one
          action: "add",
          quantity: 1,
        });
        alert(`${scanResult.product.name} added to cart!`);
      } catch (err) {
        console.error("Add to cart failed:", err);
        alert("Add to cart failed.");
      }
    }
  };
  const handleCancel=async()=>{
    navigate('/')
  }

  return (
    <div style={{ textAlign: "center" }}>
      {/* ✅ NAVIGATION TAB */}
      <nav style={{ marginBottom: "20px" }}>
  <Link to="/">Home</Link> |{" "}
  <Link to={`/cart/${userId}`}>View Cart</Link>
  </nav>
      <h1>Scan a Product QR Code</h1>

      {!scanResult && (
        <>
          <div id="reader" style={{ width: "300px", margin: "auto" }} />

          <button
            onClick={async () => {
              try {
                const res = await axios.post(
                  "http://localhost:3000/ar/scan-product",
                  {
                    markerId: "marker101", // test
                    userId,
                  }
                );
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

      {/* ✅ SCANNED PRODUCT + ADD TO CART */}
      {scanResult && (
        <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block" }}>
          <h3>Scanned Product:</h3>
          <p><strong>Name:</strong> {scanResult.product.name}</p>
          <p><strong>Price:</strong> ₹{scanResult.product.price}</p>
          <p><strong>Marker:</strong> {scanResult.product.markerCode}</p>

          <button
            onClick={handleAddToCart}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={handleCancel}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ScannerPage;
