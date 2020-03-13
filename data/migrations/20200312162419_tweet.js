
exports.up = function (knex) {
    return knex.schema.createTable('tweet', tbl => {
        tbl.increments()

        tbl
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');


        tbl
            .timestamp('created_at').defaultTo(knex.fn.now())


        tbl
            .specificType('likes', 'INTEGER[]')


        tbl
            .specificType('retweets', 'INTEGER[]')

        tbl
            .specificType('comments', 'STRING[]')
    })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tweet')
};
