
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {id:1, user_id:1, restaurant_id:1},
        {id:2, user_id:1, restaurant_id:2},
        {id:3, user_id:1, restaurant_id:3},
        {id:4, user_id:2, restaurant_id:5},
        {id:5, user_id:2, restaurant_id:6},
        {id:6, user_id:2, restaurant_id:2},
        {id:7, user_id:3, restaurant_id:4},
        {id:8, user_id:3, restaurant_id:1},
        {id:9, user_id:3, restaurant_id:3}
      ]);
    }).then(function() {
      return knex.raw("SELECT setval('favorites_id_seq', (SELECT MAX(id) FROM favorites));")
  })
};
