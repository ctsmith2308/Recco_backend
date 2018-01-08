
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dashboard', function(table){
    table.increments()
    table.string('username', 45).notNullable().unique()
    table.string('bio', 160).notNullable()
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dashboard')
};
