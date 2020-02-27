const config = require('../../knexfile').development
var devDb = require('knex')(config)

module.exports = {
    getAllUsers: function(db = devDb) {
        //const db = testDb || devDb
        return db('users')
            .select()
    },
    getUserById: function(id, db = devDb) {
        //const db = testDb || devDb
        return db('users')
            .where('id', id)
            .select()
    },
    deleteUserById: function(id, db = devDb) {
        return db('users')
            .where('id', id)
            .delete()
    },
    addUser: function(user, db = devDb) {
        return db('users')
            .insert(user)
    },
    updateUser: function(user, db = devDb) {
        return db('users')
            .where('id', user.id)
            .update(user)
    }
}