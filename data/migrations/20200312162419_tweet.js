
exports.up = function (knex) {
    return knex.schema.createTable('tweet', tbl => {
        tbl.increments()

        tbl
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');


        tbl
            .timestamp('created_at').defaultTo(knex.fn.now())


        tbl
            .integer('likes')


        tbl
            .integer('retweets')

        tbl
            .integer('comments')
    })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tweet')
};
