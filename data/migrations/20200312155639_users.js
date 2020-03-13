
exports.up = function (knex) {
    return knex.schema.createTable('user', tbl => {
        tbl.increments()

        tbl
            .string('user_name')
            .notNullable()
            .unique()


        tbl
            .string('name')
            .notNullable()


        tbl
            .string('bio')


        tbl
            .string('password')
            .notNullable()


        tbl
            .date('birthday')


        tbl
            .json('location')


        tbl
            .timestamp('created_at')
            .defaultTo(knex.fn.now())


        tbl
            .specificType('followers', 'INTEGER[]')


        tbl
            .specificType('following', 'INTEGER[]')

        tbl
            .specificType('tweets', 'STRING[]')
    })
};

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists('user')
};
