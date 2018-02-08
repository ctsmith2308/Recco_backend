
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(table){
    table.increments()
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
    table.decimal('lat')
    table.decimal('long')
    table.string('name')
    table.string('address')
    table.string('website')
    table.string('phone_number')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites')
};
