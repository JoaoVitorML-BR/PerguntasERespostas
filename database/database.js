const sequelize = require('sequelize');

const connection = new sequelize('guiaperguntas', 'root', '1904', {
    host: 'localhost', // onde o banco/servidor está rodando
    dialect: 'mysql' // tipo do banco
});

module.exports = connection;