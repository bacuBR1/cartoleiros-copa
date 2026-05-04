const { DataTypes } = require("sequelize");
const db = require("./db");

const Jogo = db.define("Jogo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rodada: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  selecao_a_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  selecao_b_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gols_a: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    defaultValue: null
  },
  gols_b: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    defaultValue: null
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: "pendente"
  }
}, {
  tableName: "jogos",
  timestamps: false
});

module.exports = Jogo;