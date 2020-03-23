
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
            .string('avi')


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
            .integer('followers')
            .defaultTo(0)


        tbl
            .integer('following')
            .defaultTo(0)

        tbl
            .integer('tweets')
            .defaultTo(0)
    })
};

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists('user')
};
