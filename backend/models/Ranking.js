const { DataTypes } = require("sequelize");
const db = require("./db");

const Ranking = db.define("Ranking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  total_pontos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  palpites_certos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  palpites_feitos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  posicao: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: "ranking",
  timestamps: false
});

module.exports = Ranking;