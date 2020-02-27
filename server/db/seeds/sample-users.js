exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, name: 'Harry', password: 'password' },
                { id: 2, name: 'Ron', password: 'password' },
                { id: 3, name: 'Fred', password: 'password' },
                { id: 4, name: 'George', password: 'password' },
                { id: 5, name: 'Neville', password: 'password' }
            ]);
        });
};