
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'test1@test.com', uid:'***********1'},
        {id: 2, email: 'test2@test.com', uid:'***********2'},
        {id: 3, email: 'test3@test.com', uid:'***********3'}
      ]);
    }).then(function() {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
  })
};
