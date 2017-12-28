
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', (table)=>{
    table.increments().primary()
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
    table.integer('restaurant_id').notNullable().references('restaurants.id').onDelete('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants')
};
