exports.up = function(knex) {
    return knex.schema.createTable('chat', table => {
        table.increments('id')
        table.integer('room_id')
        table.timestamp('time')
        table.integer('user_id')
        table.string('msg')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('chat')
};
