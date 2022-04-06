// Banco de dados Respostas

const sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define('respostas', {
     corpo: {
        type: sequelize.TEXT,
        allowNUll: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNUll: false
    }
});


Resposta.sync({force: false});

module.exports = Resposta;