const { DataTypes } = require("sequelize");
const db = require("./db");

const Selecao = db.define("Selecao", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(70),
    allowNull: false,
    unique: true
  },
  grupo: {
    type: DataTypes.CHAR,
    allowNull: false
  }
}, {
  tableName: "selecoes",
  timestamps: false
});

module.exports = Selecao;