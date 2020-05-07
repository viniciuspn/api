/*
Imagine que você ficou responsável por desenvolver o backend do sistema de uma biblioteca. Crie uma API RESTful para o cadastro, edição, 
listagem e exclusão dos livros (título, autor, edição) e o controle de entradas e saídas. Não utilize frameworks.
*/
const validations = require('./validations')();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const clienteSql = require('./scriptsSQL')();


const campoBrigatorioEditora = ['nomeEditora'];
const campoBrigatorioAutor = ['nomeAutor'];
const campoBrigatorioLivro = ['nomeLivro'];

const campoBrigatorioEditar = ['novoNome'];



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
//Editora
app.post('/cadastrar/editora', (req, res) => {
    const body = req.body;
    var errorReponse = [];
    var validaBody = validations.validaBody(body, campoBrigatorioEditora);
    if (validaBody.length) {
        errorReponse.push({
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
    var validaBody = validations.validaBody(body, campoBrigatorioEditar);
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
//Autor
app.post('/cadatrar/autor', (req, res) => {
    const body = req.body;
    var errorReponse = [];
    var validaBody = validations.validaBody(body, campoBrigatorioAutor);
    if (validaBody.length) {
        errorReponse.push({
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
        clienteSql.verificaAutor(body.nomeAutor)
            .then(function (rows) {
                if (rows[0]['count(*)'] > 0) {
                    res.status(200);
                    res.send({
                        data: body.nomeAutor,
                        message: 'Autor já cadastrado'
                    });
                } else {
                    clienteSql.addAutor(body.nomeAutor)
                        .then(function (rows) {
                            res.status(200);
                            res.send({
                                data: body.nomeAutor,
                                message: 'Autor cadatrado com sucesso'
                            });
                        })
                        .catch(function (error) {
                            res.status(500);
                            res.send({
                                data: body.nomeAutor,
                                message: 'Erro ao gravar Autor'
                            });
                        });

                }
            }).catch(function (error) {
                res.status(500);
                res.send({
                    data: body.nomeAutor,
                    message: 'Erro ao Pesquisar Autor'
                });
            });
    }
});

app.put('/editar/autor/:idAutor', (req, res) => {
    const parametro = req.params;
    const body = req.body;
    var errorReponse = [];
    var validaBody = validations.validaBody(body, campoBrigatorioEditar);
    if (validaBody.length) {
        errorReponse.push({
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
        clienteSql.verificaAutor(body.novoNome)
            .then(function (rows) {
                if (rows[0]['count(*)'] > 0) {
                    res.status(200);
                    res.send({
                        data: body.novoNome,
                        message: 'Este nome já foi cadastrado'
                    });
                } else {
                    clienteSql.editarAutor(parametro.idAutor, body.novoNome)
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
                                message: 'Erro ao altera o nome do Autor'
                            });
                        });

                }
            }).catch(function (error) {
                res.status(500);
                res.send({
                    data: body.novoNome,
                    message: 'Erro ao Pesquisar Autor'
                });
            });
    }
});

app.get('/listar/autores', (req, res) => {
    clienteSql.retornaAutores()
        .then(function (rows) {
            res.status(500);
            res.send({
                data: rows
            });
        })
        .catch(function (erro) {
            res.status(500)
            res.send({
                message: 'Erro na pesquisa de Autores'
            })
        });
});

app.delete('/deltar/autor/:idAutor', (req, res) => {
    const parametro = req.params;

    clienteSql.deletarAutor(parametro.idAutor)
        .then(function (rows) {
            res.status(200)
            res.send({
                message: 'Autor deletada com sucesso'
            })
        })
        .catch(function (erro) {
            res.status(500)
            res.send({
                message: 'Erro ao Deletar Autor'
            })
        })

});

//Livro
app.post('/cadatrar/livro/:idEditora/:idAutor', (req, res) => {
    const body = req.body;
    const parametro = req.params;
    var errorReponse = [];
    var validaBody = validations.validaBody(body, campoBrigatorioLivro);
    if (validaBody.length) {
        errorReponse.push({
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
        clienteSql.verificaLivro(body.nomeLivro)
            .then(function (rows) {
                if (rows[0]['count(*)'] > 0) {
                    res.status(200);
                    res.send({
                        data: body.nomeLivro,
                        message: 'Livro já cadastrado'
                    });
                } else {
                    clienteSql.addLivro(body.nomeLivro, parametro)
                        .then(function (rows) {
                            res.status(200);
                            res.send({
                                data: body.nomeLivro,
                                message: 'Livro cadatrado com sucesso'
                            });
                        })
                        .catch(function (error) {
                            res.status(500);
                            res.send({
                                data: body.nomeLivro,
                                message: 'Erro ao gravar Livro'
                            });
                        });

                }
            }).catch(function (error) {
                res.status(500);
                res.send({
                    data: body.nomeAutor,
                    message: 'Erro ao Pesquisar Livro'
                });
            });
    }
});

app.put('/editar/nome/livro/:idLivro', (req, res) => {
    const parametro = req.params;
    const body = req.body;
    var errorReponse = [];
    var validaBody = validations.validaBody(body, campoBrigatorioEditar);
    if (validaBody.length) {
        errorReponse.push({
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
        clienteSql.verificaLivro(body.novoNome)
            .then(function (rows) {
                if (rows[0]['count(*)'] > 0) {
                    res.status(200);
                    res.send({
                        data: body.novoNome,
                        message: 'Este nome já foi cadastrado'
                    });
                } else {
                    clienteSql.editarLivro(parametro.idLivro, body.novoNome)
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
                                message: 'Erro ao altera o nome do Livro'
                            });
                        });

                }
            }).catch(function (error) {
                res.status(500);
                res.send({
                    data: body.novoNome,
                    message: 'Erro ao Pesquisar Livro'
                });
            });
    }
});

app.put('/editar/editora/livro/:idLivro/:idEditora', (req, res) => {
    const parametro = req.params;
    clienteSql.editarLivroEditoraAutor(parametro.idEditora, parametro.idLivro, 2)
        .then(function (rows) {
            res.status(200);
            res.send({
                message: 'Editora alterado com sucesso'
            });
        })
        .catch(function (error) {
            res.status(500);
            res.send({
                message: 'Erro ao alterar a Editora do Livro'
            });
        });


});

app.put('/editar/autor/livro/:idLivro/:idAutor', (req, res) => {
    const parametro = req.params;
    clienteSql.editarLivroEditoraAutor(parametro.idAutor, parametro.idLivro, 1)
        .then(function (rows) {
            res.status(200);
            res.send({
                message: 'Autor alterado com sucesso'
            });
        })
        .catch(function (error) {
            res.status(500);
            res.send({
                message: 'Erro ao alterar a Autor do Livro'
            });
        });


});

app.delete('/deltar/livro/:idLivro', (req, res) => {
    const parametro = req.params;

    clienteSql.deletarLivro(parametro.idLivro)
        .then(function (rows) {
            res.status(200)
            res.send({
                message: 'Livro deletada com sucesso'
            })
        })
        .catch(function (erro) {
            res.status(500)
            res.send({
                message: 'Erro ao Deletar Livro'
            })
        })

});

app.get('/listar/livros', (req, res) => {
    clienteSql.retornaLivros()
        .then(function (rows) {
            res.status(500);
            res.send({
                data: rows
            });
        })
        .catch(function (erro) {
            res.status(500)
            res.send({
                message: 'Erro na pesquisa de Livros'
            })
        });
});


module.exports = app;