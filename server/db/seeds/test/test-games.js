const data = [
    { id: 1, name: "Harry's Hangout", password: "", status: "pending" },
    { id: 2, name: "Ron's Room", password: "", status: "pending" },
    { id: 3, name: "Riddle's Ruckus", password: "pureblood", status:"playing"},
    { id: 4, name: "Albus' Arcade", password:"", status: "closed"}
]

exports.data = data

exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('games').del()
        .then(function () {
            // Inserts seed entries
            return knex('games').insert(data);
        });
};