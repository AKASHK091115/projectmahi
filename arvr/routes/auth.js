const express = require('express');
const router = express.Router();
const User = require('../models/user'); // You must create this model

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/profile', async (req, res) => {
  const { email, phone, address, height, weight, shape } = req.body;

  try {
    // Find the existing user by unique email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the extra profile fields
    user.phone = phone;
    user.address = address;
    user.height = height;
    user.weight = weight;
    user.shape = shape;

    await user.save();

    // ✅ Send back updated user including `id`
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/profile/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;

