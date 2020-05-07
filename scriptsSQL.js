const database = require('./database');
var connBiblioteca = database.biblioteca('biblioteca');

module.exports = function () {
//editora
  function verificaEditora(nome, callback) {
    return connBiblioteca('editora')
      .where({
        nome_editora: nome
      })
      .count()
      .select();
  };

  function addEditora(nome) {
    return connBiblioteca('editora')
      .insert({
        nome_editora: nome
      });

  };

  function retornaEditoras() {
    return connBiblioteca('editora')
      .select(
        'id_editora as idEditora',
        'nome_editora as nome'
      )
  };

  function deletarEditora(id) {
    return connBiblioteca('editora')
      .where({
        id_editora: id
      })
      .delete();

  };

  function editarEditora(id, nome) {
    return connBiblioteca('editora')
      .where({
        id_editora: id
      })
      .update({
        nome_editora: nome
      })

  };
//Autor
  function verificaAutor(nome, callback) {
    return connBiblioteca('autor')
      .where({
        nome_autor: nome
      })
      .count()
      .select();
  };

  function addAutor(nome) {
    return connBiblioteca('autor')
      .insert({
        nome_autor: nome
      });

  };

  function retornaAutores() {
    return connBiblioteca('autor')
      .select(
        'id_autor as idAutor',
        'nome_autor as nome'
      )
  };

  function deletarAutor(id) {
    return connBiblioteca('autor')
      .where({
        id_autor: id
      })
      .delete();

  };

  function editarAutor(id, nome) {
    return connBiblioteca('autor')
      .where({
        id_autor: id
      })
      .update({
        nome_autor: nome
      })

  };

  return {
    verificaEditora: verificaEditora,
    addEditora: addEditora,
    retornaEditoras: retornaEditoras,
    deletarEditora: deletarEditora,
    editarEditora: editarEditora,
    verificaAutor: verificaAutor,
    addAutor: addAutor,
    retornaAutores: retornaAutores,
    deletarAutor: deletarAutor,
    editarAutor: editarAutor
  }

}