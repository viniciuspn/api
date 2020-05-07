/*
Imagine que você ficou responsável por desenvolver o backend do sistema de uma biblioteca. Crie uma API RESTful para o cadastro, edição, 
listagem e exclusão dos livros (título, autor, edição) e o controle de entradas e saídas. Não utilize frameworks.
*/
const validations = require('./validations')();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const clienteSql = require('./scriptsSQL')();
const expressValidator = require('express-validator');

const campoBrigatorioEditora = ['nomeEditora'];
const campoBrigatorioAutor = ['nomeAutor'];
const campoBrigatorioEditarEditora = ['novoNome'];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/cadastrar/editora', (req, res) => {
    const body = req.body;
    var errorReponse = [];
    var validaBody = validations.validaBody(body, campoBrigatorioEditora);
    if (validaBody.length) {
        errorReponse.push({
            header: {
                erro: '007'
            },
            body: {
                data: validaBody,
                message: 'Campos devem ser preenchidos'
            }
        });
    }

    if (errorReponse.length) {
        res.status(400);
        res.send(errorReponse);
    } else {
        clienteSql.verificaEditora(body.nomeEditora)
            .then(function (rows) {
                if (rows[0]['count(*)'] > 0) {
                    res.status(200);
                    res.send({
                        data: body.nomeEditora,
                        message: 'Editora já cadastrado'
                    });
                } else {
                    clienteSql.addEditora(body.nomeEditora)
                        .then(function (rows) {
                            res.status(200);
                            res.send({
                                data: body.nomeEditora,
                                message: 'Editora cadatrada com sucesso'
                            });
                        })
                        .catch(function (error) {
                            res.status(500);
                            res.send({
                                data: body.nomeEditora,
                                message: 'Erro ao gravar Editora'
                            });
                        });

                }
            }).catch(function (error) {
                res.status(500);
                res.send({
                    data: body.nomeEditora,
                    message: 'Erro ao Pesquisar Editora'
                });
            });
    }
});

app.put('/editar/editora/:idEditora', (req, res) => {
    const parametro = req.params;
    const body = req.body;
    var errorReponse = [];
    var validaBody = validations.validaBody(body, campoBrigatorioEditarEditora);
    if (validaBody.length) {
        errorReponse.push({
            header: {
                erro: '007'
            },
            body: {
                data: validaBody,
                message: 'Campos devem ser preenchidos'
            }
        });
    }

    if (errorReponse.length) {
        res.status(400);
        res.send(errorReponse);
    } else {
        clienteSql.verificaEditora(body.novoNome)
            .then(function (rows) {
                if (rows[0]['count(*)'] > 0) {
                    res.status(200);
                    res.send({
                        data: body.novoNome,
                        message: 'Este nome já foi cadastrado'
                    });
                } else {
                    clienteSql.editarEditora(parametro.idEditora, body.novoNome)
                        .then(function (rows) {
                            res.status(200);
                            res.send({
                                data: body.novoNome,
                                message: 'Nome alterado com sucesso'
                            });
                        })
                        .catch(function (error) {
                            res.status(500);
                            res.send({
                                data: body.novoNome,
                                message: 'Erro ao altera o nome da Editora'
                            });
                        });

                }
            }).catch(function (error) {
                res.status(500);
                res.send({
                    data: body.novoNome,
                    message: 'Erro ao Pesquisar Editora'
                });
            });
    }
});

app.get('/listar/editoras', (req, res) => {
    clienteSql.retornaEditoras()
        .then(function (rows) {
            res.status(500);
            res.send({
                data: rows//,
                //message: 'Erro ao gravar Editora'
            });
        })
        .catch(function (erro) {
            res.status(500)
            res.send({
                message: 'Erro na pesquisa de Editora'
            })
        });
});

app.delete('/deltar/editora/:idEditora', (req, res) => {
    const parametro = req.params;

    clienteSql.deletarEditora(parametro.idEditora)
        .then(function (rows) {
            res.status(200)
            res.send({
                message: 'Editora deletada com sucesso'
            })
        })
        .catch(function (erro) {
            res.status(500)
            res.send({
                message: 'Erro ao Deletar Editora'
            })
        })

})

app.post('/cadatrar/altor', (req, res) => {
    const body = req.body;
    var errorReponse = [];
    var validaBody = validations.validaBody(body, campoBrigatorioAutor);
    if (validaBody.length) {
        errorReponse.push({
            header: {
                erro: '007'
            },
            body: {
                data: validaBody,
                message: 'Campos devem ser preenchidos'
            }
        });
    }

    if (errorReponse.length) {
        res.status(400);
        res.send(errorReponse);
    } else {

        var gravou = database.verificaEditora(body.nomeEditora);
        console.log(verificaEdiora);

    }
});

module.exports = app;