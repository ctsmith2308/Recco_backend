
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {id: 1, user_id:1, restaurant_id:4, review:'great food'},
        {id: 2, user_id:1, restaurant_id:5, review:'terrible service'},
        {id: 3, user_id:2, restaurant_id:6, review:'food poisoning'},
        {id: 4, user_id:2, restaurant_id:5, review:'awesome atmosphere'},
        {id: 5, user_id:3, restaurant_id:2, review:'too expensive'},
        {id: 6, user_id:3, restaurant_id:1, review:'highly recommend'},
      ]);
    }).then(function() {
      return knex.raw("SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));")
  })
};
