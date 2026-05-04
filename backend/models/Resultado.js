const { DataTypes } = require("sequelize");
const db = require("./db");

const Resultado = db.define("Resultado", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jogo_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  selecao_vencedora_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gols_a: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  gols_b: {
    type: DataTypes.SMALLINT,
    allowNull: false
  }
}, {
  tableName: "resultados",
  timestamps: false
});

module.exports = Resultado;