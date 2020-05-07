const knex = require('knex');

module.exports = {

    biblioteca: function (database) {
        return knex({
            client: 'sqlite3',
            connection: {
                filename: "./sql/biblioteca.db"
            }

        });
    }
};
