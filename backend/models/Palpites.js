const { DataTypes } = require("sequelize");
const db = require("./db");

const Palpite = db.define("Palpite", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  jogo_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  selecao_vencedora_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  gols_palpite_a: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },

  gols_palpite_b: {
    type: DataTypes.SMALLINT,
    allowNull: false
  }

}, {
  tableName: "palpites",
  timestamps: false
});

module.exports = Palpite;