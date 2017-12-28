
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {id: 1, name: 'Centro'},
        {id: 2, name: 'Tahona'},
        {id: 3, name: 'Eureka'},
        {id: 4, name: 'Bar Taco'},
        {id: 5, name: 'Via Perla'},
        {id: 6, name: 'Hapa'}
      ]);
    }).then(function() {
      return knex.raw("SELECT setval('restaurants_id_seq', (SELECT MAX(id) FROM restaurants));")
  })
};
