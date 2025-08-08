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
