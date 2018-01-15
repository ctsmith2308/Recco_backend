
exports.up = function(knex, Promise) {
  return knex.schema.createTable('photos', function(table){
    table.increments()
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
    table.string('image_url')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos')
};
