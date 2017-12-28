
exports.up = function(knex, Promise) {
  return knex.schema.createTable('friends', (table) => {
    table.increments().primary()
    table.integer('user_id').references('users.id').onDelete('CASCADE')
    table.integer('friend_id').references('users.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('friends')
};
