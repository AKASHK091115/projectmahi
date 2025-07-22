// routes/ar-scan.js
const express = require('express');
module.exports = (blockchain, Product) => {
  const router = express.Router();

  router.post('/scan-product', async (req, res) => {
    try {
      const { userId, markerId } = req.body;

      
      const product = await Product.findOne({ where: { markerCode: markerId } });

      if (!product) {
        return res.status(404).json({ error: 'Product not found for scanned marker.' });
      }
   const scanData = {
  userId,
  productId: product.id,
  productName: product.name,
  price: product.price, // 🔥 add this line
  markerId,
  action: 'scanned',
  timestamp: new Date().toISOString()
};

      const block = await blockchain.addBlock(scanData);

      res.status(200).json({
        message: 'Product scanned and recorded.',
        product,
        block
      });
    } catch (err) {
      console.error('Scan error:', err);
      res.status(500).json({ error: 'Scan processing failed' });
    }
  });

  return router;
};
