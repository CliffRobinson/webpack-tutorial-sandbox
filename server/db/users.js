const log = require('loglevel')
var devDb = require('./connection')

module.exports = {
    getAllUsers: function (testDb) {

        const db = testDb || devDb
        log.trace(`Getting all users from DB`)
        return db('users')
            .select()
    },
    getUserById: function (id, testDb) {

        const db = testDb || devDb
        log.trace(`Getting user id:${id} from DB`)
        return db('users')
            .where('id', id)
            .select()
    },
    deleteUserById: function (id, testDb) {

        const db = testDb || devDb
        log.trace(`Deleting user id:${id} from DB`)
        return db('users')
            .where('id', id)
            .delete()
    },
    addUser: function (user, testDb) {

        const db = testDb || devDb
        log.trace(`Adding user ${user.name} to DB`)
        return db('users')
            .insert(user)
    },
    updateUser: function (user, testDb) {

        const db = testDb || devDb
        log.trace(`Updating user ${user.name} in DB`)
        return db('users')
            .where('id', user.id)
            .update(user)
    }
}