// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSearchParams } from "react-router-dom";

// const ScannerPage = () => {
//   const [searchParams] = useSearchParams();
//   const [markerId, setMarkerId] = useState("");  // initially empty
//   const [userId] = useState("u123");
//   const [scanResult, setScanResult] = useState(null);

//   useEffect(() => {
//     // Use markerId from URL, or fallback to default
//     const marker = searchParams.get("markerId") || "marker101";  // 👈 default marker
//     setMarkerId(marker);
//     handleScan(marker);
//   }, [searchParams]);

//   const handleScan = async (marker = markerId) => {
//     try {
//       const response = await axios.post("http://localhost:3000/ar/scan-product", {
//         markerId: marker,
//         userId,
//       });
//       setScanResult(response.data);
//     } catch (err) {
//       console.error(err);
//       alert("Scan failed.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "2rem" }}>
//       <h1>Scan the QR</h1>

//       {markerId ? (
//         <>
//           <img
//             src={`http://localhost:3000/qr?markerId=${markerId}`}
//             alt={`QR Code for ${markerId}`}
//             style={{ width: "200px", margin: "20px" }}
//           />
//           <p><strong>Marker ID:</strong> {markerId}</p>
//         </>
//       ) : (
//         <p>Loading QR...</p>
//       )}

//       <button onClick={() => handleScan()}>Simulate Scan</button>

//       {scanResult && (
//         <div style={{ marginTop: "20px", textAlign: "left" }}>
//           <h3>Scan Result:</h3>
//           <pre>{JSON.stringify(scanResult, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScannerPage;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSearchParams } from "react-router-dom";

// const ScannerPage = () => {
//   const [searchParams] = useSearchParams();
//   const [markerId, setMarkerId] = useState("");
//   const [userId] = useState("u123");
//   const [scanResult, setScanResult] = useState(null);

//   useEffect(() => {
//     const marker = searchParams.get("markerId") || "marker101"; // Default marker
//     setMarkerId(marker);
//     handleScan(marker);
//   }, [searchParams]);

//   const handleScan = async (marker = markerId) => {
//     try {
//       const response = await axios.post("http://localhost:3000/ar/scan-product", {
//         markerId: marker,
//         userId,
//       });
//       setScanResult(response.data);
//     } catch (err) {
//       console.error(err);
//       alert("Scan failed.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "2rem", fontFamily: "Arial" }}>
//       <h1>Scan the QR</h1>

//       {markerId ? (
//         <>
//           <img
//             src={`http://localhost:3000/qr?markerId=${markerId}`}
//             alt={`QR Code for ${markerId}`}
//             style={{ width: "200px", margin: "20px" }}
//           />

//           {scanResult?.product ? (
//             <div
//               style={{
//                 marginTop: "20px",
//                 padding: "1rem",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 display: "inline-block",
//                 textAlign: "left",
//                 backgroundColor: "#f9f9f9",
//               }}
//             >
//               <h2 style={{ color: "#1a73e8", margin: "0 0 10px 0" }}>
//                 {scanResult.product.name}
//               </h2>
//               <p><strong>Price:</strong> ₹{scanResult.product.price}</p>
//               <p><strong>Scanned At:</strong> {new Date(scanResult.block.timestamp).toLocaleString()}</p>
//               <p style={{ fontSize: "0.85rem", color: "#555" }}>
//                 <strong>Block Hash:</strong> {scanResult.block.hash.slice(0, 16)}...
//               </p>
//             </div>
//           ) : (
//             <p><strong>Scanning marker:</strong> {markerId}</p>
//           )}
//         </>
//       ) : (
//         <p>Loading QR...</p>
//       )}

//       <div style={{ marginTop: "1rem" }}>
//         <button onClick={() => handleScan()} style={{ padding: "10px 20px", fontSize: "1rem" }}>
//           Simulate Scan
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ScannerPage;
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
      const response = await axios.post("http://localhost:3000/ar/scan-product", {
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
            src={`http://localhost:3000/qr?markerId=${markerId}`}
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
