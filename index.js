const express = require('express');
const app = express();
const bodyparser = require('body-parser') // responsavel por traduzir os dados enviado pelo form em uma estrutura JS    
const connection = require('./database/database');
const pergunta = require('./database/pergunta');
const Resposta = require('./database/Resposta')

// Banco de dados

connection.authenticate()
.then(() => {
    console.log('Banco de dados connectado com sucesso!')
})
.catch((e) => {
    console.log(e)
});


// Servidor

app.set('view engine', 'ejs'); // faz o express rodar a view engine EJS (faz o express usar o ejs como se fosse o "html")
app.use(express.static('public')); // arquivos staticos do site (que não são processados no backend)

// Body-Parser

app.use(bodyparser.urlencoded({extended: false})); // decodifica os dados enviados pelo formulario

// Rotas

app.get('/', (req, res) => {
    // renderiza a index.ejs ao acessar a rota /
    pergunta.findAll( {raw: true, order: [
        ['id', 'DESC'] // ordena as perguntas decrescente, se quisesse pela crescente botaria ASC
    ]}).then((pergunta) => {
        res.render('index', {
            pergunta: pergunta
        });
    }); // procura as pergutnas no banco de dados
    // o render já olha automaticamente na pasta views, não sendo necessario o uso do path completo.
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
});

app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo; // pegando os dados da tag name lá na pergunta.ejs
    var descricao = req.body.descricao; // pegando os dados da tag descricao lá na pergunta.ejs
    
    // salvando os dados no banco de dados
    pergunta.create({
         titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/') // ao ser feito a pergunta, redireciona para a home.
    })
});

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id; // pegando o id para olhar no banco qual pergunta que ele clicou no botao "responder"
    pergunta.findOne({
        where: {id: id} // buscando no bd uma pergunta que tenha o id = a var id
    }).then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{
            res.redirect('/')
        }
    });

});

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/'+perguntaId);
    })
});

app.listen(8080, () => console.log('Servidor rodando na porta: http://localhost:8080'))