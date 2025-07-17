const express = require('express');
const sequelize = require('./config/config');
const Blockchain = require('./blockchain/blockchain');
const Product = require('./models/product'); // 👈 include Product model
const qrRoutes = require('./routes/qr');
const auth=require('./routes/auth')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/qr', qrRoutes);
app.use('/auth',auth);
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('DB synced.');

    const bc = new Blockchain();
    await bc.init();

    const cartRoutes = require('./routes/cart')(bc);
    app.use('/cart', cartRoutes);

    const arScanRoutes = require('./routes/ar-scan')(bc, Product); // 👈 add scan route
    app.use('/ar', arScanRoutes); // 👈 mount it at /ar

    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  } catch (err) {
    console.error('Startup error:', err);
  }
})();
