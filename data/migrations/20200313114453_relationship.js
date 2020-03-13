
exports.up = function(knex) {
    return knex.schema.createTable('relationship', tbl => {
        tbl.increments()
  
        tbl
        .integer('followed')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
  
        tbl
        .integer('follower')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('user')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('relationship');
  };