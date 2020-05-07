CREATE TABLE editora (
    id_editora   INTEGER    PRIMARY KEY AUTOINCREMENT
                            NOT NULL,
    nome_editora TEXT (100) NOT NULL
);


CREATE TABLE autor (
    id_autor   INTEGER    PRIMARY KEY AUTOINCREMENT
                          NOT NULL,
    nome_autor TEXT (100) NOT NULL
);

CREATE TABLE livro (
    id_livro   INTEGER PRIMARY KEY AUTOINCREMENT
                       NOT NULL,
    nome_livro TEXT    NOT NULL,
    id_editora         NOT NULL
                       REFERENCES editora (id_editora) ON DELETE CASCADE,
    id_autor           NOT NULL
                       REFERENCES autor (id_autor) ON DELETE CASCADE
);
