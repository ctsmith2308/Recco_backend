
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table){
    table.increments()
    table.string('user_review').notNullable()
    table.decimal('lat')
    table.decimal('long')
    table.string('name')
    table.string('address')
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reviews')
};
