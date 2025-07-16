const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Product = sequelize.define('Product', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  markerCode: { type: DataTypes.STRING },  // this is the tag/QR/NFT/AR marker
}, {
  tableName: 'products',
  timestamps: false
});
module.exports = Product;