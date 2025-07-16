const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Block = sequelize.define('Block', {
  index: { type: DataTypes.INTEGER, allowNull: false },
  timestamp: { type: DataTypes.STRING, allowNull: false },
  data: { type: DataTypes.JSON, allowNull: false },
  prevHash: { type: DataTypes.STRING, allowNull: false },
  hash: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'blocks',
  timestamps: false
});

module.exports = Block;
