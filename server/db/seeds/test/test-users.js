const data = [
    { id: 1, name: 'Harry', password: 'password', currentGame: 0 },
    { id: 2, name: 'Ron', password: 'password', currentGame: 1 },
    { id: 3, name: 'Fred', password: 'password', currentGame: 1 },
    { id: 4, name: 'George', password: 'password', currentGame: 2 },
    { id: 5, name: 'Neville', password: 'password', currentGame: 2 }
]

exports.data = data;

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert(data);
        });
};