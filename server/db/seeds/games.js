
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, name: "Harry's Hangout", password:"", status:"pending"},
      ]);
    });
};
