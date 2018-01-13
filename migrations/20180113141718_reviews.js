
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table){
    table.increments()
    table.string('user_eview')
    table.string('place_id')
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reviews')
};
