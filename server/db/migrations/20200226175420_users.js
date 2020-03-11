exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('name')
        table.string('password')
        table.integer('currentGame')
    })
};

exports.down = function(knex) {
    //TODO: Test this
    return knex.schema.dropTable('users')
};