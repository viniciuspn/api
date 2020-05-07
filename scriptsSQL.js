const database = require('./database');
var connBiblioteca = database.biblioteca('biblioteca');

module.exports = function () {

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
  return {
    verificaEditora: verificaEditora,
    addEditora: addEditora,
    retornaEditoras: retornaEditoras,
    deletarEditora: deletarEditora,
    editarEditora: editarEditora
  }

}