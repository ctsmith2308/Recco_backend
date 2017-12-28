
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'test1@test.com', hashed_token:'8iejfajknv79'},
        {id: 2, username: 'test2@test.com', hashed_token:'090jiniyugac'},
        {id: 3, username: 'test3@test.com', hashed_token:'90uuh645dytv'}
      ]);
    }).then(function() {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
  })
};