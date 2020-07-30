exports.up = function(knex) {
    return knex.schema.createTable('games', table => {
        table.increments('id')
        table.string('name')
        table.string('password')
        table.string('status')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('games')    
};
