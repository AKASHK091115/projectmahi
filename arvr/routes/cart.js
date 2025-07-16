const express = require('express');

module.exports = (bc) => {
  const router = express.Router();

  router.post('/addBlock', async (req, res) => {
    try {
      const data = req.body;
      const newBlock = await bc.addBlock(data);
      res.json({ success: true, block: newBlock });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to add block' });
    }
  });

  router.get('/chain', (req, res) => {
    res.json({ chain: bc.chain, valid: bc.isValid() });
  });
  router.get('/history/:userId', (req, res) => {
  const { userId } = req.params;

  try {
    const history = bc.chain.filter(
      block =>
        block.data.userId === userId &&
        (block.data.action === 'add' || block.data.action === 'remove')
    );

    res.json({ userId, history });
  } catch (err) {
    console.error('History fetch error:', err);
    res.status(500).json({ error: 'Could not fetch history' });
  }
});
router.get('/cart-state/:userId', (req, res) => {
  const { userId } = req.params;

  try {
    const cartMap = {};

    for (const block of bc.chain) {
      const data = block.data;

      if (data.userId === userId && (data.action === 'add' || data.action === 'remove')) {
        const pid = data.productId;
        const qty = data.quantity || 0;

        if (!cartMap[pid]) cartMap[pid] = 0;

        if (data.action === 'add') cartMap[pid] += qty;
        if (data.action === 'remove') cartMap[pid] -= qty;

        // Prevent negative quantity
        if (cartMap[pid] < 0) cartMap[pid] = 0;
      }
    }

    // Convert map to array
    const cart = Object.entries(cartMap).map(([productId, quantity]) => ({
      productId,
      quantity
    }));

    res.json({ userId, cart });
  } catch (err) {
    console.error('Cart state fetch error:', err);
    res.status(500).json({ error: 'Could not fetch cart state' });
  }
});


  return router;
};
