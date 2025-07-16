// // routes/qr.js
// const express = require('express');
// const QRCode = require('qrcode');

// const router = express.Router();

// // Example: GET /qr?markerId=marker101
// // router.get('/', async (req, res) => {
// //   const { markerId } = req.query;

// //   if (!markerId) {
// //     return res.status(400).json({ error: 'markerId required' });
// //   }

// //   try {
// //     const qrData = markerId; // Can also be JSON string if needed
// //     const qrImage = await QRCode.toDataURL(qrData);
// //     res.send(`<img src="${qrImage}" alt="QR Code for ${markerId}" />`);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Failed to generate QR' });
// //   }
// // });
// // GET /qr?markerId=marker101
// router.get('/', async (req, res) => {
//   const { markerId } = req.query;

//   if (!markerId) {
//     return res.status(400).json({ error: 'markerId required' });
//   }

//   try {
//     const qrData = markerId;
//     const qrImage = await QRCode.toDataURL(qrData);
    
//     // Tell the browser this is a base64 image
//     const base64Data = qrImage.replace(/^data:image\/png;base64,/, '');
//     const imgBuffer = Buffer.from(base64Data, 'base64');
    
//     res.set('Content-Type', 'image/png');
//     res.send(imgBuffer);  // send raw PNG buffer
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to generate QR' });
//   }
// });

// module.exports = router;
// routes/qr.js
const express = require('express');
const QRCode = require('qrcode');

const router = express.Router();

// GET /qr?markerId=marker101
router.get('/', async (req, res) => {
  const { markerId } = req.query;

  if (!markerId) {
    return res.status(400).json({ error: 'markerId required' });
  }

  try {
    // Generate PNG image buffer
    const qrImageBuffer = await QRCode.toBuffer(markerId);

    // Set the response header to image/png
    res.setHeader('Content-Type', 'image/png');
    res.send(qrImageBuffer); // Send image directly
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate QR' });
  }
});

module.exports = router;
