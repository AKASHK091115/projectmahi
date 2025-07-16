// ScanPage.jsx
import React, { useEffect, useState } from 'react';

function ScanPage() {
  const [markerId] = useState('marker101'); // This could be from scanned data
  const [scanResult, setScanResult] = useState(null);

  const handleScan = async () => {
    const res = await fetch('http://localhost:3000/cart/scan-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u123', markerId })
    });

    const data = await res.json();
    setScanResult(data);
  };

  return (
    <div>
      <h2>Scan the QR</h2>
      <img src={`http://localhost:3000/qr?markerId=${markerId}`} alt="QR Code" />
      <button onClick={handleScan}>Scan Now</button>

      {scanResult && (
        <div>
          <h4>Scanned Product: {scanResult.product.name}</h4>
          <p>Price: ₹{scanResult.product.price}</p>
        </div>
      )}
    </div>
  );
}

export default ScanPage;
