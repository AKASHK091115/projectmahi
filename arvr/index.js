const express = require('express');
const sequelize = require('./config/config');
const Blockchain = require('./blockchain/blockchain');
const Product = require('./models/product'); 
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

    const arScanRoutes = require('./routes/ar-scan')(bc, Product);
    app.use('/ar', arScanRoutes);

    app.listen(3000, () => console.log('Server running on https://tx475zwk-3000.inc1.devtunnels.ms/'));
  } catch (err) {
    console.error('Startup error:', err);
  }
})();
