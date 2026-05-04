const { DataTypes } = require('sequelize');
const db = require('./db');  

const Cadastro = db.define('Cadastro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  N_telefone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  tableName: 'cadastro',  
  timestamps: false,      
});

module.exports = Cadastro;