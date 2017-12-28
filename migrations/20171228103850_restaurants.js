
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', (table) => {
    table.increments().primary()
    table.string('name', 255).notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants')
};
