// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('cartdb', 'root', 'Akash@36091115', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: false
// });

// module.exports = sequelize;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgresql://neondb_owner:npg_P5MHclU9kutr@ep-damp-scene-adi4ddsk-pooler.c-2.us-east-1.aws.neon.tech/cartdb?sslmode=require&channel_binding=require',
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

module.exports = sequelize;
