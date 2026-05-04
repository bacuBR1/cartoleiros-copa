require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        dialect: "mysql",
    }
);

(async () => {
  try {
    await db.authenticate();
    console.log('db Conectado!');
  } catch (error) {
    console.error('Erro no db:', error);
  }
})();

module.exports = db;