const log = require('loglevel')

const config = require('../../knexfile').development
var devDb = require('knex')(config)

module.exports = {
    getAllUsers: function(db = devDb) {
        log.trace(`Getting all users from DB`)
        return db('users')
            .select()
    },
    getUserById: function(id, db = devDb) {
        log.trace(`Getting user id:${id} from DB`)
        return db('users')
            .where('id', id)
            .select()
    },
    deleteUserById: function(id, db = devDb) {
        log.trace(`Deleting user id:${id} from DB`)
        return db('users')
            .where('id', id)
            .delete()
    },
    addUser: function(user, db = devDb) {
        log.trace(`Adding user ${user.name} to DB`)
        return db('users')
            .insert(user)
    },
    updateUser: function(user, db = devDb) {
        log.trace(`Updating user ${user.name} in DB`)
        return db('users')
            .where('id', user.id)
            .update(user)
    }
}