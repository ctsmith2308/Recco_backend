
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary()
    table.string('email', 255).unique()
    table.string('hashed_token', 255).unique()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
