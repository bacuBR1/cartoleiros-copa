const { DataTypes } = require('sequelize');
const db = require('./db');  

const Adm = db.define('Adm', {
    nome: {
        type: DataTypes.STRING(100),
        primaryKey: true,
    },
    senha: {
        type: DataTypes.STRING(100),
        unique: true,
    },
}, {
    tableName: 'adm',
    timestamps: false,
});

module.exports = Adm;