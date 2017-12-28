
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', (table)=>{
    table.increments().primary()
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
    table.integer('restaurant_id').notNullable().references('restaurants.id').onDelete('CASCADE')
    table.string('review').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews')
};
