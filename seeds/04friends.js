
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {id: 1, user_id: 1, friend_id: 2},
        {id: 2, user_id: 1, friend_id: 3},
        {id: 3, user_id: 2, friend_id: 3},
        {id: 4, user_id: 2, friend_id: 1},
        {id: 5, user_id: 3, friend_id: 2},
        {id: 6, user_id: 3, friend_id: 1},
      ]);
    }).then(function() {
      return knex.raw("SELECT setval('friends_id_seq', (SELECT MAX(id) FROM friends));")
  })
};
