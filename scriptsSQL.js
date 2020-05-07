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

  //Livro
  function verificaLivro(nome, callback) {
    return connBiblioteca('livro')
      .where({
        nome_livro: nome
      })
      .count()
      .select();
  };

  function addLivro(nome, id) {
    return connBiblioteca('livro')
      .insert({
        nome_livro: nome,
        id_autor: id.idEditora,
        id_editora: id.idAutor

      });

  };

  function editarLivro(id, nome) {
    return connBiblioteca('livro')
      .where({
        id_livro: id
      })
      .update({
        nome_livro: nome
      })

  };

  function editarLivroEditoraAutor(id, idLivro, tipo) {
    var updateSet = {}
    if (tipo === 1) {
      updateSet = { id_autor: + id }
    } else {
      updateSet = { id_editora: id }
    }
    return connBiblioteca('livro')
      .where({
        id_livro: idLivro
      })
      .update(
        updateSet
      )

  };

  function deletarLivro(id) {
    return connBiblioteca('livro')
      .where({
        id_livro: id
      })
      .delete();

  };

  function retornaLivros() {
    return connBiblioteca('livro as livro')
      .join('autor as autor', function () {
        this.on('livro.id_autor', '=', 'autor.id_autor')
      })
      .join('editora as editora', function () {
        this.on('livro.id_editora', '=', 'editora.id_editora')
      })
      .select(
        'livro.id_livro as idLivro',
        'livro.nome_livro as nomeLivro',
        'autor.id_autor as idAutor',
        'autor.nome_autor as nomeAutor',
        'editora.id_editora as idEditora',
        'editora.nome_editora as nomeEditora'
      )
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
    editarAutor: editarAutor,
    verificaLivro: verificaLivro,
    addLivro: addLivro,
    editarLivro: editarLivro,
    editarLivroEditoraAutor: editarLivroEditoraAutor,
    deletarLivro: deletarLivro,
    retornaLivros: retornaLivros
  }

}