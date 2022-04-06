const sequelize = require('sequelize');
const connection = require('./database');


// banco de dados configurado salvar perguntas

const pergunta = connection.define('perguntas',{
    titulo: {
        type: sequelize.STRING, // tipo do texto (string é quando não é tão grande)
        allowNull: false // não deixa o campo ser nulo
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }

});

pergunta.sync({force: false}) // cria o banco de dados chamado pergunta caso não exista no BD.
    .then(() => {
        console.log('Tabela Criada com Sucesso.')
    })
    .catch((e) => {
        console.log(e)
    });

    module.exports = pergunta;